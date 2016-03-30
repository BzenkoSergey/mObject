export default function builderInit(descriptor: any) {
    if(!descriptor.init) {
        return false;
    }
    return this.$.onInit(descriptor.init);
}