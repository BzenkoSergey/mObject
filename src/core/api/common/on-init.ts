import ModelClass from './../../model-class.ts';
import Utils from './../../../utils/utils.ts';

export default function OnInit() {
 
	ModelClass.$.onInit = onInit;
    ModelClass.prototype.$.onInit = onInit;

	function onInit(cb: any, destroyer? : any) {
        var Owner = this.ModelClass || this.instance;
        if(this.instance) {
            cb.apply(Owner, Owner._data().initArgs);
        }
        let stackItemDestroyer = Utils.addToInstStack(Owner, cb);
        return function initDestroyer() {
            if(typeof destroyer === 'function') {
                destroyer.apply(Owner);
            }
            stackItemDestroyer();
        };
	}
}