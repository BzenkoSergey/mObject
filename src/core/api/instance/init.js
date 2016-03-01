injector.set('init', Init);

function Init(injector) {
	var ModelClass = injector.get('model-class');
	ModelClass.prototype.$.init = init;

	function init() {
        var instance = this.instance;
        
        var modelData = instance.constructor._data(),
            modelInstStack = modelData.instStack;

        if(!modelInstStack) {
            modelInstStack = modelData.instStack = [];
        }

        var instData = instance._data(),
            instStack = instData.instStack;

        instData.initArgs = arguments;

        if(!instStack) {
            instStack = instData.instStack = modelInstStack.slice();
        }

        Utils.performStackCbs(instance, instStack, arguments);
        return instance;
	}
}
