injector.set('components-creator', ComponentsCreator);

function ComponentsCreator(injector) {
	var ModelClass = injector.get('model-class');
    
	ModelClass.$.createComponent = createComponent;
    ModelClass.prototype.$.createComponent = createComponent;
    
    function createComponent(descriptor) {
        compiler.componentName = descriptor.name;
        return compiler;
        function compiler(Chep) {
            var deregs = [];
            
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
        };
    }
}