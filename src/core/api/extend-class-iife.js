injector.set('extend-class-iife', ExtendClassIIFE);

function ExtendClassIIFE(injector) {
	var ModelClass = injector.get('model-class');

	ModelClass.$.extendClassIife = extendClassIife;

	function extendClassIife(sources) {
        var extender = function(Owner, ParentClass) {
            Utils.extendObjIife(Owner, sources, arguments, true);
        };

        var Owner = this.ModelClass,
            ParentClass = this.ParentClass;

        extender.apply(Owner, [Owner, ParentClass]);

		return this.onExtend(extender);
	}
}
