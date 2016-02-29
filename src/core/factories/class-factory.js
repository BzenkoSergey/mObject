injector.set('class-factory', ClassFactory);

function ClassFactory(injector) {
    return function() {
        function BaseClass() {
            // instance private data
            var instData = {};
            this._data = dataGetter.bind(null, instData);
            
            // cb on create instance
            return this.init.apply(this, arguments);
        }

        // model private data
        var data = {};
        BaseClass._data = dataGetter.bind(null, data);
        
        return BaseClass;
    };
    
    function dataGetter(someData) {
        return someData;
    }
}
