describe('ModelClass $ ExtendClass', function() {
	var ParentModel, ChildModel,
		parentInst, childInst;

	beforeEach(function() {
		var fn = function() {};
		ParentModel = mObject.$.extend({
			fn: fn
		});
		ChildModel = ParentModel.$.extend();
		
		parentInst = new ParentModel(),
		childInst = new ChildModel();
	});

	it('class creating', function () {
        var Model = mObject.$.extend(),
            Child = Model.$.extend();

		assert.isFunction(Model);
		assert.isFunction(Child);
		assert.notStrictEqual(Model, Child);
	});

	it('class inheritance', function () {
        var fn = function() {};

        var Model = mObject.$.extend();
        Model.prototype.fn = fn;
        
        var Child = Model.$.extend();

		assert.strictEqual(Model.prototype.fn, Child.prototype.fn);
	});

	it('classes inheritance conflicts', function () {
        var Model = mObject.$.extend(),
            Child1 = Model.$.extend();

        Child1.prototype.prop = true;
        var Child1_2 = Child1.$.extend();
        var Child2 = Model.$.extend();

		assert.isDefined(Child1_2.prototype.prop);
		assert.isUndefined(Child2.prototype.prop);
	});
});
