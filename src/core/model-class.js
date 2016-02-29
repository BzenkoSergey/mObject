injector.set('model-class', ModelClass);

function ModelClass(injector) {
	var ClassFactory = injector.get('class-factory');
    var BaseClass = ClassFactory();

	return BaseClass;
}
