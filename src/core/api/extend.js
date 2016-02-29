injector.set('extend', Extend);

function Extend(injector) {
    var ClassFactory = injector.get('class-factory');
    var ModelClass = injector.get('model-class');

    prepareInheritance(ModelClass);
    ModelClass.$.extend = extend;

    function extend(sources) {
        var ParentClass = this.ModelClass;
        var ChildClass = ClassFactory();

        prepareInheritance(ChildClass, ParentClass);

        // stacks support
        Utils.cloneStack(ParentClass, ChildClass);
        Utils.cloneInstStack(ParentClass, ChildClass);

        // inject new features
        Utils.extendObj(ChildClass.prototype, sources);

        // inject constructor init        
        var init = sources ? sources.init : null;
        if(init) {
            ChildClass.$.onInit(init);
        }

        ChildClass.$._build(ParentClass);
        return ChildClass;
    }

    // create mObject ecosystem
    function prepareInheritance(ChildClass, ParentClass) {
        ChildClass.$ = ParentClass ? Object.create(ParentClass.$) : {};
        ChildClass.$.ModelClass = ChildClass;
        ChildClass.$.ParentClass = ParentClass || {};
        ChildClass.prototype = ParentClass ? Object.create(ParentClass.prototype) : {};
        ChildClass.prototype.constructor = ChildClass;
    }
}
