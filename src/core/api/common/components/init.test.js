describe('$ Components', function() {
    var component, component2;

	beforeEach(function() {  
        var descriptor = genDescriptor('test-component', 'arguments', 'prop', 4);
        var descriptor2 = genDescriptor('test-component-2', 'arguments2', 'prop2', 5);
    
		component = mObject.$.createComponent(descriptor);
		component2 = mObject.$.createComponent(descriptor2);
        
        function genDescriptor(name, propArgs, prop, propValue) {
            return {       
                name: name,
                init: function() {
                    this[propArgs] = arguments;
                    this[prop] = propValue;
                }
            };
        }
    });

	it('init', function() {
        var Child = mObject.$.extend();
        Child.$.regComponent(component);
        Child.$.useComponent('test-component');

        var child = new Child(1, 2, 3);
        assert.strictEqual(child.prop, 4);
        assert.strictEqual(child.arguments[0], 1);
        assert.strictEqual(child.arguments[1], 2);
        assert.strictEqual(child.arguments[2], 3);     
    });

	it('inherit init', function() {
        var Child = mObject.$.extend();
        
        var SubChild = Child.$.extend();
        SubChild.$.regComponent(component);
        SubChild.$.useComponent('test-component');

        var SubSubChild = SubChild.$.extend();
        var subSubChild = new SubSubChild(3, 2, 1);

        assert.strictEqual(subSubChild.prop, 4);
        assert.strictEqual(subSubChild.arguments[0], 3);
        assert.strictEqual(subSubChild.arguments[1], 2);
        assert.strictEqual(subSubChild.arguments[2], 1);
    });

	it('multi components init', function() {
        var Child = mObject.$.extend();
        Child.$.regComponent(component);
        Child.$.regComponent(component2);

        Child.$.useComponent('test-component');
        Child.$.useComponent('test-component-2');

        var child = new Child(1, 2, 3);
        
        assert.strictEqual(child.prop, 4);
        assert.strictEqual(child.arguments[0], 1);
        assert.strictEqual(child.arguments[1], 2);
        assert.strictEqual(child.arguments[2], 3);
        
        assert.strictEqual(child.prop2, 5);
        assert.strictEqual(child.arguments2[0], 1);
        assert.strictEqual(child.arguments2[1], 2);
        assert.strictEqual(child.arguments2[2], 3);
    });

	it('inheritance init tree', function() {
        var MainTree = mObject.$.extend();
        
        var Tree_1 = MainTree.$.extend();
        Tree_1.$.regComponent(component);
        Tree_1.$.useComponent('test-component');
        
        var Tree_2 = MainTree.$.extend();

        var Tree_1_1 = Tree_1.$.extend();
        var Tree_2_2 = Tree_2.$.extend();

        var tree_1_1 = new Tree_1_1();
        var tree_2_2 = new Tree_2_2();

        assert.strictEqual(tree_1_1.prop, 4);
        assert.isUndefined(tree_2_2.prop);
    });
});
