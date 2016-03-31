describe('$ Components: destroy', function() {
	var arg1 = {},
        arg2 = {};
    
    var descriptor = {
        name: 'test-component',
        init: function() {
            this.prop = true;
        },

        destroy: function() {
            this.scope = this;
            this.args = arguments;
            this.prop = undefined;
        }
    };
    
    var component = mObject.$.createComponent(descriptor);
    var Child;
    
    beforeEach(function() {
        Child = mObject.$.extend();
        Child.$.regComponent(component);
    });
    
    
    it('arguments', function() {
        var child = new Child(arg1, arg2);
        var destroyer = child.$.useComponent('test-component');
        destroyer();
        
        assert.strictEqual(child.args[0], arg1);
        assert.strictEqual(child.args[1], arg2);
    });
    
    it('scope', function() {
        var child = new Child();
        var destroyer = child.$.useComponent('test-component');
        destroyer();
        
        assert.strictEqual(child.scope, child);
    });

    it('destroy', function() {
        var child = new Child();
        var destroyer = child.$.useComponent('test-component');
        destroyer();

        assert.isUndefined(child.prop);
    });

    it('destroy re-init', function() {
        var child = new Child();
        var destroyer = child.$.useComponent('test-component');
        destroyer();
        child.$.reInit();
        assert.isUndefined(child.prop);
    });
});