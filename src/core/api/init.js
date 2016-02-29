injector.set('init', Init);

function Init(injector) {
	var ModelClass = injector.get('model-class');
	ModelClass.prototype.init = init;

	function init() {
        var modelData = this.constructor._data(),
            modelInstStack = modelData.instStack;

        if(!modelInstStack) {
            modelInstStack = modelData.instStack = [];
        }

        var instData = this._data(),
            instStack = instData.instStack;

        instData.initArgs = arguments;

        if(!instStack) {
            instStack = instData.instStack = modelInstStack.slice();
        }

        Utils.performStackCbs(this, instStack, arguments);
        return this;
	}
}
