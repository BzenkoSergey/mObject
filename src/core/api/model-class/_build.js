injector.set('_build', Build);

function Build(injector) {
    injector.run('extend');

    var ModelClass = injector.get('model-class');
    ModelClass.$._build = build;
    
    function build(ParentClass) {
        var ModelClass = this.ModelClass,
            modelData = ModelClass._data();

        var modelStack = modelData.stack;

        Utils.performStackCbs(ModelClass, modelStack, [ModelClass, ParentClass]);
    }
}
