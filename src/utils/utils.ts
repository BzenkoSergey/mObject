export default class Utils {
    static addToStack(Owner: any, cb: any) {
        var data = Owner._data(),
            stack = data.stack,
            cbIndex = stack.length;

        stack.push(cb);
        return makePropDestroyer(cbIndex, stack);
    }
    
    static addToInstStack(Owner: any, cb: any) {
        var data = Owner._data(),
            instStack = data.instStack,
            cbIndex = instStack.length;

        instStack.push(cb);
        return makePropDestroyer(cbIndex, instStack);
    }
    
    static extendObj(obj: any, sources: any, withProto: boolean = false) {
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

    static extendObjIife(obj: any, sources: any, args: any, withProto: boolean = false) {
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
    
    static performStackCbs(scope: any, stack: any, args: any) {
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

    static cloneStack(ParentClass: any, ChildClass: any = {}) {
        var parentData = ParentClass ? ParentClass._data() : {},
            childData = ChildClass._data();
        
        childData.stack = (parentData.stack || []).slice();
    }

    static cloneInstStack(ParentClass: any, ChildClass: any = {}) {
        var parentData = ParentClass ? ParentClass._data() : {},
            childData = ChildClass._data();
        
        childData.instStack = (parentData.instStack || []).slice();
    }
}


function makePropDestroyer(name: any, source: any) {
    return propDestroyer.bind(null, name, source)
}

function propDestroyer(name: any, source: any) {
    source[name] = undefined;
}