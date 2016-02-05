var Utils = (function() {
    return {
        extendObject: extendObject,
        makeExtender: makeExtender
    };

    function extendObject(baseObj, source) {
        for(var propName in source || {}) {
            if(!source.hasOwnProperty(propName)) {
                continue;
            }
            if(propName === 'init') {
                continue;
            }
            baseObj[propName] = source[propName];
        }
    }

    function makeExtender(values) {
        return function() {
            Utils.extendObject(this, values);    
        }
    }
})();
