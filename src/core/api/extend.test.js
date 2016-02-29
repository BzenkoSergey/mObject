// describe('ModelClass $ Extend', function() {
// 	var ParentModel, ChildModel,
// 		parentInst, childInst;

// 	beforeEach(function() {
// 		var fn = function() {};
// 		ParentModel = mObject.$.extend({
// 			fn: fn
// 		});
// 		ChildModel = ParentModel.$.extend();
		
// 		parentInst = new ParentModel(),
// 		childInst = new ChildModel();
// 	});

// 	it('instance relations', function () {
// 		assert.instanceOf(parentInst, ParentModel);
// 		assert.instanceOf(childInst, ChildModel);
// 		assert.instanceOf(childInst, ParentModel);
// 	});

// 	it('instances inheritance', function () {
// 		assert.isDefined(parentInst.fn);
// 		assert.isDefined(childInst.fn);
// 		assert.strictEqual(parentInst.fn, childInst.fn);
// 	});

// 	it('instances inheritance conflicts', function () {
//         var Model = mObject.$.extend(),
//             Child1 = Model.$.extend({
//                 prop: true
//             }),
//             Child1_2 = Child1.$.extend(),
//             Child2 = Model.$.extend();

//         var child1_2 = new Child1_2(),
//             child2 = new Child2();

// 		assert.isDefined(child1_2.prop);
// 		assert.isUndefined(child2.prop);
// 	});
// });
