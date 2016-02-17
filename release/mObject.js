(function(window) {
 var injector = (function() {
	var storage = {};
	
	function Injector() {}

	Injector.prototype = {
        get: get,
        set: set,
        run: run
    };

	return injector = new Injector();

    // initialize injector
	function run() {
		for(var name in storage) {
			get.apply(this, [name]);
		}
	}

	function get(name) {
		var component = storage[name];
		if(!component.inited) {
			return use.apply(this, [name])
		}
		return component.cb || null;
	}

	function set(name, fn) {
		return storage[name] = create(fn);
	}
	
	function create(fn) {
		return {
			fn: fn,
			inited: false
		};
	}
	
	function use(name) {
		var component = storage[name],
			cb = component.fn.apply(null, [this]);

		component.cb = cb;
		component.inited = true;
		return component.cb;
	}
})();

var Utils = (function() {
    return {
        extendObject: extendObject,
        makeExtender: makeExtender
    };

    function extendObject(baseObj, source) {
        for(var propName in source || {}) {
            if(!source.hasOwnProperty(propName)) {
                continue;
            }
            if(propName === 'init') {
                continue;
            }
            baseObj[propName] = source[propName];
        }
    }

    function makeExtender(values) {
        return function() {
            Utils.extendObject(this, values);    
        }
    }
})();

injector.set('class-$$', Class$$);

function Class$$() {
	return function() {
        return {
            onExtend: []
        };
	};
}

injector.set('class-creator', ClassCreator);

function ClassCreator(injector) {
	var Class$$ = injector.get('class-$$');
    
	return function() {
        ModelClass.$$ = Class$$();
		return ModelClass;

        function ModelClass() {
            // Initialize instance
            if(this.init) {
                return this.init.apply(this, arguments);
            }
        };
	};
}

injector.set('proto-$$', Proto$$);

function Proto$$() {
	return function() {
        return {
            inits: []
        };
	};
}

injector.set('proto-creator', ProtoCreator);

function ProtoCreator(injector) {
	var Proto$$ = injector.get('proto-$$');
    
	return function(protoParent, onCreatCb) {

		function ProtoObject() {
            if(onCreatCb) {
                onCreatCb.apply(this);
            }
            
            // Storage for system data
            this.$$ = Proto$$();
		}
		ProtoObject.prototype = protoParent || {};

		return new ProtoObject();
	};
}

injector.set('extend-class-iife', ExtendClassIIFE);

function ExtendClassIIFE(injector) {
	var ModelClass = injector.get('model-class');

	ModelClass.$.extendClassIife = extendClassIife;

	function extendClassIife(values) {
        var args = [values];
		this.onExtend(function() {
            iifePerformer.apply(this, args);
        });
        iifePerformer.apply(this.ModelClass, args);
		return this.ModelClass;
	}

    function iifePerformer(values) {
        for(var prop in values) {
            this[prop] = values[prop].apply(this);
        }
    }
}

injector.set('extend-class', ExtendClass);

function ExtendClass(injector) {
	var ModelClass = injector.get('model-class');

	ModelClass.$.extendClass = extendClass;

	function extendClass(values) {
        var extender = Utils.makeExtender(values);
		this.onExtend(extender);
        extender.apply(this.ModelClass);
		return this.ModelClass;
	}
}

injector.set('extend-proto', Extend);

function Extend(injector) {
	var ClassCreator = injector.get('class-creator'),
		ProtoCreator = injector.get('proto-creator'),
	    Class$$ = injector.get('class-$$');

	var ModelClass = injector.get('model-class');
	ModelClass.$.extend = extend;

    // Create a new ModelClass
	function extend(values) {
		values = values || {};
        
        // Inst proto
		var proto = this.ModelClass.prototype,
            protoExtender = Utils.makeExtender(values);

		var ClassObject = ClassCreator();
		ClassObject.prototype = ProtoCreator(proto, protoExtender);
        
        // support inits
        if(values.init) {
            ClassObject.prototype.$$.inits = proto.$$.inits.slice(0);
            ClassObject.prototype.$$.inits.push(values.init);
        }

		// Model proto
        var classProtoExtender = Utils.makeExtender({
			ModelClass: ClassObject // each class prototype ($) will have link on self Class 
		});
		ClassObject.$ = ProtoCreator(this, classProtoExtender);
        ClassObject.$$ = Class$$();
        
        // support on extend
        if(this.ModelClass.$$.onExtend) {
            ClassObject.$$.onExtend = this.ModelClass.$$.onExtend.slice(0);
            for(var i = 0; ClassObject.$$.onExtend.length > i; i++) {
                ClassObject.$$.onExtend[i].apply(ClassObject, [this.ModelClass]);
            }
        }

		return ClassObject;
	}
}

injector.set('init', Init);

function Init(injector) {
	var ModelClass = injector.get('model-class'),
	    Proto$$ = injector.get('proto-$$');
        
	ModelClass.prototype.init = init;
    ModelClass.prototype.$$ = Proto$$();

	function init() {
        for(var i = 0; this.$$.inits.length > i; i++) {
            this.$$.inits[i].apply(this, arguments);
        }
		return this;
	}
}

injector.set('on-extend', OnExtend);

function OnExtend(injector) {
	var ModelClass = injector.get('model-class');
	ModelClass.$.onExtend = onExtend;

	function onExtend(cb) {
        this.ModelClass.$$.onExtend.push(cb);
		return this.ModelClass;
	}
}

injector.set('model-class', ModelClass);

function ModelClass(injector) {
	var ClassCreator = injector.get('class-creator'),
		ProtoCreator = injector.get('proto-creator');

	var BaseClass = ClassCreator(),
        classExtender = Utils.makeExtender({
            ModelClass: BaseClass
        });

	BaseClass.$ = ProtoCreator({}, classExtender);
	BaseClass.prototype = ProtoCreator();

	return BaseClass;
}

injector.run();
var mObject = injector.get('model-class');
window.mObject = mObject;
 
})(window);