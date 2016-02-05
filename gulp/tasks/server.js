var paths = require('./../paths.js'),
	libs = require('./../libs.js'),
	gulp = libs.gulp,
	connect = libs.connect;

module.exports = function() {
	connect.server({
		root: paths.release,
		port: 1000
	});
};
