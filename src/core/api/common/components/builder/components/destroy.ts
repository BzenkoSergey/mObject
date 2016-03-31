export default function builderDestroy(descriptor: any) {
    if(typeof descriptor.destroy !== 'function') {
        return false;
    }
    return function() {
        var args = this._data().initArgs;
        descriptor.destroy.apply(this, args);
    }.bind(this);
}