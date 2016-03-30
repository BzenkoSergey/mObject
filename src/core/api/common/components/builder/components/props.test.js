describe('$ Components: props', function() {
	var propCbCounter = 0,
        arg1 = {},
        arg2 = {};
    
    var descriptor = {
        name: 'test-component',
        init: function(arg, arg2) {
            this.prop = false;
            this.propCb = 4;
        },

        props: {
            prop: true,
            propCb: function(arg, arg2) {
                this.scope = this;
                this.propsArgs = arguments;
                ++propCbCounter;
                return propCbCounter;
            },
            isUsedComponent: function() {
                return true;
            }
        }
    };
    
    var component = mObject.$.createComponent(descriptor);
    var Child = mObject.$.extend();
    
    beforeEach(function() {
        propCbCounter = 0;    
    
        Child = mObject.$.extend();
        Child.$.regComponent(component);
    });
    
    
    it('init arguments', function() {
        Child.$.useComponent('test-component');
        var child = new Child(arg1, arg2);
        assert.strictEqual(child.propsArgs[0], arg1);
        assert.strictEqual(child.propsArgs[1], arg2);
    });
    
    it('init scope', function() {
        Child.$.useComponent('test-component');
        var child = new Child();
        assert.strictEqual(child.scope, child);
    });

    it('init', function() {
        Child.$.useComponent('test-component');
        var child = new Child();

        assert.strictEqual(child.prop, true);
        assert.strictEqual(child.propCb, 1);
    });
    
    it('init ordering, conflicts with init', function() {
        var child = new Child();
        
        assert.isUndefined(child.prop);
        assert.isUndefined(child.propCb);
        
        child.$.useComponent('test-component');
        assert.strictEqual(child.prop, true);
        assert.strictEqual(child.propCb, 1);
    });

    it('re-init', function() {
        Child.$.useComponent('test-component');
        var child = new Child();

        assert.strictEqual(child.prop, true);
        assert.strictEqual(child.propCb, 1);
    
        child.$.reInit();
        
        assert.strictEqual(child.prop, true);
        assert.strictEqual(child.propCb, 2);
    });

    it('inheritance', function() {
        Child.$.useComponent('test-component');
        var SubChild = Child.$.extend();
        var SubSubChild = SubChild.$.extend();

        var subSubChild = new SubSubChild();
        
        assert.strictEqual(subSubChild.prop, true);
        assert.strictEqual(subSubChild.propCb, 1);
    
        subSubChild.$.reInit();
        
        assert.strictEqual(subSubChild.prop, true);
        assert.strictEqual(subSubChild.propCb, 2);
    });

    it('inheritance conflicts', function() {
        var SubChild1 = Child.$.extend();
        SubChild1.$.useComponent('test-component');
        
        var SubChild2 = Child.$.extend();

        var subChild1 = new SubChild1();
        var subChild2 = new SubChild2();
        
        assert.isTrue(subChild1.isUsedComponent);
        assert.isUndefined(subChild2.isUsedComponent);
    
        subChild1.$.reInit();
        subChild2.$.reInit();
        
        assert.isTrue(subChild1.isUsedComponent);
        assert.isUndefined(subChild2.isUsedComponent);
    });
    
});

// describe('$ Components', function() {
// 	var descriptor = {
//         name: 'test-component',
//         init: function(arg, arg2) {
//             this.arguments = arguments;
//             this.prop = 4;
//         },

//         isSinglton: true,
//         props: {},
        
//         class: {},
//         classIife: {},
//         instance: {},
//     };
    
//     var component = mObject.$.createComponent(descriptor);
//     var Child = mObject.$.extend();
//     Child.$.regComponent(component);

// 	it('init', function() {
//         Child.$.useComponent('test-component');
//         var child = new Child();
//         assert.strictEqual(child.prop, 4);

//         var SubChild = Child.$.extend();
//         var subChild = new SubChild();
        
//         assert.strictEqual(subChild.prop, 4);       
//     });

// 	it('create instance arguments', function() {
//         Child.$.useComponent('test-component');
        
//         var child = new Child(1, 2, 3);
//         assert.deepEqual(child.arguments, [1, 2, 3]);

//         var SubChild = Child.$.extend();
//         var subChild = new SubChild(3, 2, 1);    
//         assert.deepEqual(subChild.arguments, [3, 2, 1]);
//     });


// 	// it('instances inheritance', function () {
// 	// 	assert.isDefined(parentInst.fn);
// 	// 	assert.isDefined(childInst.fn);
// 	// 	assert.strictEqual(parentInst.fn, childInst.fn);
// 	// });

// 	// it('instances inheritance conflicts', function () {
//     //     var Model = mObject.$.extend(),
//     //         Child1 = Model.$.extend({
//     //             prop: true
//     //         }),
//     //         Child1_2 = Child1.$.extend(),
//     //         Child2 = Model.$.extend();

//     //     var child1_2 = new Child1_2(),
//     //         child2 = new Child2();

// 	// 	assert.isDefined(child1_2.prop);
// 	// 	assert.isUndefined(child2.prop);
// 	// });
// });
