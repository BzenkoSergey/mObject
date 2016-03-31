export default function builderInstance(descriptor: any) {
    if(typeof descriptor.instance !== 'object') {
        return false;
    }
    
    let prototype = this.prototype || this.constructor.prototype;
    
    for(let propName in descriptor.instance) {
        prototype[propName] = descriptor.instance[propName];
    }
    
    return function() {
        var parentPrototype = this.$.ParentClass.prototype;
        for(let propName in descriptor.instance) {
            prototype[propName] = parentPrototype[propName] || undefined;
        }
    }.bind(this);
}