export default function builderProps(descriptor: any) {
    if(!descriptor.props) {
        return false;
    }

    return this.$.onInit(function initProps() {
        for(let propName in descriptor.props) {
            var prop = descriptor.props[propName];
            if(typeof prop === 'function') {
                this[propName] = prop.apply(this, arguments);
                continue;
            }
            this[propName] = prop;
        }
    });
}