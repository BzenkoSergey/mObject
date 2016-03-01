injector.set('extend-class', ExtendClass);

function ExtendClass(injector) {
	var ModelClass = injector.get('model-class');

	ModelClass.$.extendClass = extendClass;

	function extendClass(sources) {
        var extender = function(Owner) {
            Utils.extendObj(Owner, sources, true);
        };

        var Owner = this.ModelClass;
        extender.apply(Owner, [Owner]);

		return this.onExtend(extender);
	}
}
