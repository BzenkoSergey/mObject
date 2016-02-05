module.exports = {
	appFilesPaths: appFilesPaths
};

var paths = require('./paths.js'),
	libs = require('./libs.js'),
	gulp = libs.gulp;


function appFilesPaths() {
	return [
		paths.utils, 
		paths.core, 
		paths.components, 
		paths.index, 
		paths.exeptTests
	];
}
