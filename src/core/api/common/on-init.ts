import ModelClass from './../../model-class.ts';
import Utils from './../../../utils/utils.ts';

export default function OnInit() {
    //injector.run('extend');
 
	ModelClass.$.onInit = onInit;
    ModelClass.prototype.$.onInit = onInit;

	function onInit(cb: any) {
        var Owner = this.ModelClass || this.instance;
        if(this.instance) {
            cb.apply(Owner, Owner._data().initArgs);
        }
        return Utils.addToInstStack(Owner, cb);
	}
}