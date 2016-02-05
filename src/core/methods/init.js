injector.set('init', Init);

function Init(injector) {
	var ModelClass = injector.get('model-class'),
	    Proto$$ = injector.get('proto-$$');
        
	ModelClass.prototype.init = init;
    ModelClass.prototype.$$ = Proto$$();

	function init() {
        for(var i = 0; this.$$.inits.length > i; i++) {
            this.$$.inits[i].apply(this, arguments);
        }
		return this;
	}
}
