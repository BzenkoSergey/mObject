describe('$ Components: instance', function() {
    var fn1 = function() {},
        fn2 = function() {};
    
    var descriptor = {
        name: 'test-component',

        instance: {
            fn1: fn1,
            fn2: fn2
        }
    };
    
    var component = mObject.$.createComponent(descriptor);
    var Child;
    
    beforeEach(function() {
        Child = mObject.$.extend();
        Child.$.regComponent(component);
    });
    
    
    it('instance', function() {
        var destroyer = Child.$.useComponent('test-component');
        var child = new Child();

        assert.strictEqual(child.fn1, fn1);
        assert.strictEqual(child.fn2, fn2);
    });
    
    it('apply to instance', function() {
        var child = new Child();
        var destroyer = child.$.useComponent('test-component');
        
        assert.strictEqual(child.fn1, fn1);
        assert.strictEqual(child.fn2, fn2);
    });
    
    it('inheritance', function() {
        var destroyer = Child.$.useComponent('test-component');
        var SubChild = Child.$.extend();
        var subChild = new SubChild();

        assert.strictEqual(subChild.fn1, fn1);
        assert.strictEqual(subChild.fn2, fn2);
    });
    
    it('destroy', function() {
        var destroyer = Child.$.useComponent('test-component');
        var child = new Child();
        destroyer();
        
        assert.isUndefined(child.fn1);
        assert.isUndefined(child.fn2);
    });
    
    it('destroy smart', function() {
        var fn3 = function() {};
        var Parent = mObject.$.extend({
            fn2: fn3
        });
        var Child = Parent.$.extend();
        Child.$.regComponent(component);
        var destroyer = Child.$.useComponent('test-component');
        
        var child = new Child();
        destroyer();
        
        assert.isUndefined(child.fn1);
        assert.strictEqual(child.fn2, fn3);
    });
    
    it('destroy impact on instances', function() {
        var destroyer = Child.$.useComponent('test-component');
        
        var child = new Child();
        var child2 = new Child();
        var child3 = new Child();
        destroyer();
        
        assert.isUndefined(child.fn1);
        assert.isUndefined(child.fn2);
        assert.isUndefined(child2.fn1);
        assert.isUndefined(child2.fn2);
        assert.isUndefined(child3.fn1);
        assert.isUndefined(child3.fn3);
    });
});