import ModelClass from './../../model-class.ts';
import Utils from './../../../utils/utils.ts';

export default function ExtendClassIIFE() {
	ModelClass.$.extendClassIife = extendClassIife;

	function extendClassIife(sources: any) {
        var extender = function(Owner: any, ParentClass: any) {
            Utils.extendObjIife(Owner, sources, arguments, true);
        };

        var Owner = this.ModelClass,
            ParentClass = this.ParentClass;

        extender.apply(Owner, [Owner, ParentClass]);

		return this.onExtend(extender);
	}
}