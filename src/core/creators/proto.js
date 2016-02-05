injector.set('proto-creator', ProtoCreator);

function ProtoCreator(injector) {
	var Proto$$ = injector.get('proto-$$');
    
	return function(protoParent, onCreatCb) {

		function ProtoObject() {
            if(onCreatCb) {
                onCreatCb.apply(this);
            }
            
            // Storage for system data
            this.$$ = Proto$$();
		}
		ProtoObject.prototype = protoParent || {};

		return new ProtoObject();
	};
}
