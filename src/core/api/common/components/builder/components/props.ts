export default function builderProps(descriptor: any) : any {
    if(!descriptor.props) {
        return false;
    }
    
    let propsDestroyer = function() {
        for(let propName in descriptor.props) {
            this[propName] = undefined;
        }
    };
    
    return this.$.onInit(function initProps() {
        for(let propName in descriptor.props) {
            var prop = descriptor.props[propName];
            
            if(typeof prop === 'function') {
                this[propName] = prop.apply(this, arguments);
                continue;
            }
            this[propName] = prop;
        }
    }, propsDestroyer);
}