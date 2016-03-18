import ModelClass from './../../model-class.ts';
import Utils from './../../../utils/utils.ts';

export default function OnExtend() {
	ModelClass.$.onExtend = onExtend;

	function onExtend(cb: any) {
        var ModelClass = this.ModelClass;
        return Utils.addToStack(ModelClass, cb);
	}
}