describe('Class creator', function() {
    var ClassCreator = injector.get('class-creator');

    it('check created class', function () {
        var ClassObject = ClassCreator();
        assert.isFunction(ClassObject, 'should be function constructor');
    });

    it('check uniqueness of classes', function () {
        var ClassObject1 = ClassCreator(),
            ClassObject2 = ClassCreator();

        assert.notStrictEqual(ClassObject1, ClassObject2, 'it should not be duplicated');
    });

    it('check system data', function () {
        var ClassObject = ClassCreator();
        assert.isObject(ClassObject.$$);
    });
});
