injector.set('on-extend', OnExtend);

function OnExtend(injector) {
	var ModelClass = injector.get('model-class');
	ModelClass.$.onExtend = onExtend;

	function onExtend(cb) {
        this.ModelClass.$$.onExtend.push(cb);
		return this.ModelClass;
	}
}
