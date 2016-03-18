import ClassFactory from './../../factories/class-factory.ts';
import ModelClass from './../../model-class.ts';
import Utils from './../../../utils/utils.ts';

export default function Extend() {
    prepareInheritance(ModelClass);
    ModelClass.$.extend = extend;

    function extend(sources: any) {
        var ParentClass = this.ModelClass;
        var ChildClass = ClassFactory();

        prepareInheritance(ChildClass, ParentClass);

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
    function prepareInheritance(ChildClass: any, ParentClass: any = false) {
        ChildClass.$ = ParentClass ? Object.create(ParentClass.$) : {};
        ChildClass.$.ModelClass = ChildClass;
        ChildClass.$.ParentClass = ParentClass || {};
        ChildClass.prototype = ParentClass ? Object.create(ParentClass.prototype) : {};
        ChildClass.prototype.constructor = ChildClass;
        ChildClass.prototype.$ = ParentClass ? Object.create(ParentClass.prototype.$) : {};

        // stacks support
        Utils.cloneStack(ParentClass, ChildClass);
        Utils.cloneInstStack(ParentClass, ChildClass);
    }
}