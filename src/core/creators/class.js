injector.set('class-creator', ClassCreator);

function ClassCreator(injector) {
	var Class$$ = injector.get('class-$$');
    
	return function() {
        ModelClass.$$ = Class$$();
		return ModelClass;

        function ModelClass() {
            // Initialize instance
            if(this.init) {
                return this.init.apply(this, arguments);
            }
        };
	};
}
