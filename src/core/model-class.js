injector.set('model-class', ModelClass);

function ModelClass(injector) {
	var ClassCreator = injector.get('class-creator'),
		ProtoCreator = injector.get('proto-creator');

	var BaseClass = ClassCreator(),
        classExtender = Utils.makeExtender({
            ModelClass: BaseClass
        });

	BaseClass.$ = ProtoCreator({}, classExtender);
	BaseClass.prototype = ProtoCreator();

	return BaseClass;
}
