injector.set('extend-class', ExtendClass);

function ExtendClass(injector) {
	var ModelClass = injector.get('model-class');

	ModelClass.$.extendClass = extendClass;

	function extendClass(values) {
        var extender = Utils.makeExtender(values);
		this.onExtend(extender);
        extender.apply(this.ModelClass);
		return this.ModelClass;
	}
}
