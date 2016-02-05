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
