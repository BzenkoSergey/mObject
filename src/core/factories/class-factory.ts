function dataGetter(someData: any) {
    return someData;
}

export default function ClassFactory() {
    return class BaseClass {
        // model private data
        static _data = dataGetter.bind(null, {});
        static $: any;
        
        private _data: any;
        public $: any;
        
        constructor() {
            // instance private data
            var instData = {};
            this._data = dataGetter.bind(null, instData);
            
            // cb on create instance
            this.$.instance = this;
            return this.$.init.apply(this.$, arguments);
        }
    }   
}