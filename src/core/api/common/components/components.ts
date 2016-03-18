import ModelClass from './../../../model-class.ts';
import Builder from './builder.ts';

export default function Components() {
    // injector.run('extend');    
    // injector.run('on-extend'); 
    // injector.run('on-init');
    
    Builder();
    
    ModelClass.$.regComponent = regComponent;
	ModelClass.$.useComponent = useComponent;
	ModelClass.prototype.$.regComponent = regComponent;
    ModelClass.prototype.$.useComponent = useComponent;
    
    ModelClass.$.onExtend(inheritSupport);
    ModelClass.$.onInit(inheritSupport);

	function regComponent(component: any) {
        var components = getComponents.apply(this);
        return components.reg[component.componentName] = component;
    }

    function useComponent(name: string) {
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
            ownComponents = {
                reg: {}, 
                use: {}
            };
        
        ownerData.components = ownComponents;
        ownComponents.reg = Object.create(parentComponents.reg || {});
        ownComponents.use = Object.create(parentComponents.use || {});
    }
}