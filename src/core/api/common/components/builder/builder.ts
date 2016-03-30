import ModelClass from './../../../../model-class.ts';

import init from './components/init.ts';
import props from './components/props.ts';

interface IComponentCompiler {
    (): any;
    componentName: string; 
}

interface IComponentDescriptor {
    name: string,
    init?: any,
    
    destroy?: any,
    props?: any;
}

let builderComponents : any[] = [
    init,
    props
];

export default function ComponentsCreator() {
	ModelClass.$.createComponent = createComponent;
    ModelClass.prototype.$.createComponent = createComponent;

    function createComponent(descriptor: any) {
        let compiler = <IComponentCompiler>function(Chep: any) {
            var deregs: any[] = [];
            
            var Owner = Chep.$.ModelClass || Chep;
            
            var data = Owner._data();
            var components = data.components;
                
            var useComponent = components.use;
            var componentName = descriptor.name;
                        
            builderComponents.forEach(function(builderComponent) {
                var cb = builderComponent.apply(Chep, [descriptor]);
                if(typeof cb !== 'function') {
                    return;
                }
                deregs.push(cb);
            });
            
            useComponent[componentName] = true;

            return function() {
                for(var i = 0; deregs.length > i; i++) {
                    deregs[i]();
                }
                useComponent[componentName] = false;
            };
        }
        
        compiler.componentName = descriptor.name;
        return compiler;
    }
}