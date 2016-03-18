import ModelClass from './../../model-class.ts';
import Utils from './../../../utils/utils.ts';

export default function ExtendClass() {
	ModelClass.$.extendClass = extendClass;

	function extendClass(sources: any) {
        var extender = function(Owner: any) {
            Utils.extendObj(Owner, sources, true);
        };

        var Owner = this.ModelClass;
        extender.apply(Owner, [Owner]);

		return this.onExtend(extender);
	}
}