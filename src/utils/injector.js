var injector = (function() {
	var storage = {};
	
	function Injector() {}

	Injector.prototype = {
        get: get,
        set: set,
        run: run
    };

	return injector = new Injector();

    // initialize injector
	function run() {
		for(var name in storage) {
			get.apply(this, [name]);
		}
	}

	function get(name) {
		var component = storage[name];
		if(!component.inited) {
			return use.apply(this, [name])
		}
		return component.cb || null;
	}

	function set(name, fn) {
		return storage[name] = create(fn);
	}
	
	function create(fn) {
		return {
			fn: fn,
			inited: false
		};
	}
	
	function use(name) {
		var component = storage[name],
			cb = component.fn.apply(null, [this]);

		component.cb = cb;
		component.inited = true;
		return component.cb;
	}
})();
