describe('Proto creator', function() {
    var ProtoCreator = injector.get('proto-creator');

    it('check created proto', function () {
        var proto = ProtoCreator();
        assert.isObject(proto, 'should be object');
    });

    it('check created proto with parent', function() {
        var parent = {
            cb: function() {}
        };
        
        var proto = ProtoCreator(parent);

        assert.isDefined(proto.cb, 'it should be inherited');
        assert.strictEqual(proto.cb, parent.cb, 'it should not be duplicated');
    });

    it('check on create cb', function () {
        var inited = false,
            runScope = null;

        var proto = ProtoCreator({}, function() {
            inited = true;
            runScope = this;
        });

        assert.isTrue(inited, 'cb should be executed on proto created');
        assert.strictEqual(proto, runScope, 'cb should be executed in proto scope');
    });

    it('check system data', function () {
        var proto = ProtoCreator({});
        assert.isObject(proto.$$);
    });
});
