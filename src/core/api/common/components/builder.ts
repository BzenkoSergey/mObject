import ModelClass from './../../../model-class.ts';

interface ComponentCompiler {
    (): any;
    componentName: any; 
}

export default function ComponentsCreator() {
	ModelClass.$.createComponent = createComponent;
    ModelClass.prototype.$.createComponent = createComponent;
    
    function createComponent(descriptor: any) {
        let compiler = <ComponentCompiler>function(Chep: any) {
            var deregs:any[] = [];
            
            var Owner = Chep.$.ModelClass || Chep;
            var data = Owner._data();
            var components = data.components;
                
            var useComponent = components.use;
            var componentName = descriptor.name;
            
            if(descriptor.init) {
                var init = Chep.$.onInit(descriptor.init);
                deregs.push(init);
            }
            
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