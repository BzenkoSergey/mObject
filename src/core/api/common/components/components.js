injector.set('components', Components);

function Components(injector) {
	var ModelClass = injector.get('model-class');
	
    injector.run('extend');    
    injector.run('on-extend'); 
    injector.run('on-init');
    
    ModelClass.$.regComponent = regComponent;
	ModelClass.$.useComponent = useComponent;
	ModelClass.prototype.$.regComponent = regComponent;
    ModelClass.prototype.$.useComponent = useComponent;
    
    ModelClass.$.onExtend(inheritSupport);
    ModelClass.$.onInit(inheritSupport);

	function regComponent(component) {
        var components = getComponents.apply(this);
        return components.reg[component.componentName] = component;
    }

    function useComponent(name) {
        var Owner = this.ModelClass || this;
        var components = getComponents.apply(this);
        var component = components.reg[name];
        if(!component) {
            console.error('component: ' + name + ' is not registered');
            return false;
        }
        if(components.use[name]) {
            return false;
        }
        
        return component(Owner);
    }
    
    function getComponents() {
        var Owner = this.ModelClass || this;
        var data = Owner._data();
        var components = data.components;
        return components;
    }

    function inheritSupport() {
        var Parent = this.$.ParentClass || this.constructor;
        var Owner = this.$.ModelClass || this;

        var parentData = Parent._data(),
            ownerData = Owner._data();
            
        var parentComponents = parentData.components || {},
            ownComponents = {};
        
        ownerData.components = ownComponents;
        ownComponents.reg = Object.create(parentComponents.reg || {});
        ownComponents.use = Object.create(parentComponents.use || {});
    }
}

/*

API design

regComponent()
useComponent()

*/


/*

Component Descriptor

{
    name: '',
    
    scope: class, instance
    args: creating args
    init: function() {
        
    },
    
    make: deregistartion cb
    props: {
        scope: class, instance
        args: creating args
        someProp: function() {
            return '';
        }
    },
    
    scope: class, instance
    destroy: [optional] function() {
        
    },
    
    isSinglon: true false,
    
    return: deregistartion cb
    class: {},
    instance: {},
    
    classIife: {}
}

*/
