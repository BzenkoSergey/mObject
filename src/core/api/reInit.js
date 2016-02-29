injector.set('re-init', ReInit);

function ReInit(injector) {
	var ModelClass = injector.get('model-class');
	ModelClass.prototype.reInit = reInit;

	function reInit() {
        var args = arguments;
        if(!args.length) {
            args = this._data().initArgs;
        }
        
        return this.init.apply(this, args);
	}
}
