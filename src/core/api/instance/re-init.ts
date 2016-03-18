import ModelClass from './../../model-class.ts';

export default function ReInit() {
	ModelClass.prototype.$.reInit = reInit;

	function reInit() {
        var instance = this.instance;
        var args = arguments;
        
        if(!args.length) {
            args = instance._data().initArgs;
        }
        
        return instance.$.init.apply(instance.$, args);
	}
}