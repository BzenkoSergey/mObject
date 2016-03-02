injector.run('extend');
injector.run();
var ModelClass = injector.get('model-class');
window.mObject = ModelClass.$.extend();