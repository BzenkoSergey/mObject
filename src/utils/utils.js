var Utils = (function() {
    return {
        extendObj: extendObj,
        extendObjIife: extendObjIife,
        cloneStack: cloneStack,
        addToStack: addToStack,
        cloneInstStack: cloneInstStack,
        addToInstStack: addToInstStack,
        performStackCbs: performStackCbs
    };
    
    function performStackCbs(scope, stack, args) {
        if(!stack || !stack.length) {
            return this;
        }
        
        args = args || [];
        
        for(var i = 0; stack.length > i; i++) {
            var cb = stack[i];
            if(!cb || typeof cb !== 'function') {
                continue;
            }
            cb.apply(scope, args);
        }
    }

    function extendObj(obj, sources, withProto) {
        if(!sources) {
            return false;
        }
        for(var name in sources) {
            if(name === 'init') {
                continue;
            }
            if(!withProto && !sources.hasOwnProperty(name)) {
                continue;
            }
            obj[name] = sources[name];
        }
        return true;
    }

    function extendObjIife(obj, sources, args, withProto) {
        if(!sources) {
            return false;
        }
        for(var name in sources) {
            if(name === 'init') {
                continue;
            }
            if(!withProto && !sources.hasOwnProperty(name)) {
                continue;
            }
            
            var cb = sources[name];
            if(typeof cb !== 'function') {
                continue;
            }

            obj[name] = cb.apply(obj, args);
        }
        return true;
    }

    function cloneStack(ParentClass, ChildClass) {
        var parentData = ParentClass._data(),
            childData = ChildClass._data();
        
        childData.stack = (parentData.stack || []).slice();
    }

    function cloneInstStack(ParentClass, ChildClass) {
        var parentData = ParentClass._data(),
            childData = ChildClass._data();
        
        childData.instStack = (parentData.instStack || []).slice();
    }

    function addToStack(Owner, cb) {
        var data = Owner._data(),
            stack = data.stack,
            cbIndex = stack.length;

        stack.push(cb);
        return makePropDestroyer(cbIndex, stack);
    }
    
    function addToInstStack(Owner, cb) {
        var data = Owner._data(),
            instStack = data.instStack,
            cbIndex = instStack.length;

        instStack.push(cb);
        return makePropDestroyer(cbIndex, instStack);
    }
    
    function makePropDestroyer(name, source) {
        return propDestroyer.bind(null, name, source)
    }
    
    function propDestroyer(name, source) {
        source[name] = undefined;
    }
})();
