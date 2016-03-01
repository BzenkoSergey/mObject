injector.set('re-init', ReInit);

function ReInit(injector) {
	var ModelClass = injector.get('model-class');
	ModelClass.prototype.$.reInit = reInit;

	function reInit() {
        var instance = this.instance;
        var args = arguments;
        
        if(!args.length) {
            args = instance._data().initArgs;
        }
        
        return instance.$.init.apply(instance.$, args);
	}
}
