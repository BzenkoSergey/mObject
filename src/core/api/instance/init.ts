import ModelClass from './../../model-class.ts';
import Utils from './../../../utils/utils.ts';

export default function Init() {
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