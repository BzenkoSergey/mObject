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
//         Child.$.useComponent('test-conponent');
//         var child = new Child();
//         assert.strictEqual(child.prop, 4);

//         var SubChild = Child.$.extend();
//         var subChild = new SubChild();
        
//         assert.strictEqual(subChild.prop, 4);       
//     });

// 	it('create instance arguments', function() {
//         Child.$.useComponent('test-conponent');
        
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
