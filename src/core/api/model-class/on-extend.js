injector.set('on-extend', OnExtend);

function OnExtend(injector) {
	var ModelClass = injector.get('model-class');
	ModelClass.$.onExtend = onExtend;

	function onExtend(cb) {
        var ModelClass = this.ModelClass;
        return Utils.addToStack(ModelClass, cb);
	}
}
