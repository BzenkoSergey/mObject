injector.set('extend-class-iife', ExtendClassIIFE);

function ExtendClassIIFE(injector) {
	var ModelClass = injector.get('model-class');

	ModelClass.$.extendClassIife = extendClassIife;

	function extendClassIife(values) {
        var args = [values];
		this.onExtend(function() {
            iifePerformer.apply(this, args);
        });
        iifePerformer.apply(this.ModelClass, args);
		return this.ModelClass;
	}

    function iifePerformer(values) {
        for(var prop in values) {
            this[prop] = values[prop].apply(this);
        }
    }
}
