injector.set('on-init', OnInit);

function OnInit(injector) {
    injector.run('extend');
    
	var ModelClass = injector.get('model-class');
	ModelClass.$.onInit = onInit;
    ModelClass.prototype.$.onInit = onInit;

	function onInit(cb) {
        var Owner = this.ModelClass || this.instance;
        return Utils.addToInstStack(Owner, cb);
	}
}
