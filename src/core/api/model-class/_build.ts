import ModelClass from './../../model-class.ts';
import Utils from './../../../utils/utils.ts';

export default function Build() {
    //injector.run('extend');

    ModelClass.$._build = build;
    
    function build(ParentClass: any) {
        var ModelClass = this.ModelClass,
            modelData = ModelClass._data();

        var modelStack = modelData.stack;

        Utils.performStackCbs(ModelClass, modelStack, [ModelClass, ParentClass]);
    }
}