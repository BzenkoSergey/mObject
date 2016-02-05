var paths = require('./../paths.js'),
	libs = require('./../libs.js'),
	utils = require('./../utils.js'),
	gulp = libs.gulp,
	watch = libs.watch,
	karma = libs.karma,
	Server = karma.Server;

module.exports = function() {
	var files = utils.appFilesPaths();
	
	files.push(paths.tests);
	
	var configs = {
		frameworks: ['mocha', 'chai'],
        browsers: ['Chrome'],
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher'
        ],
        port: 9099,
        runnerPort: 9100,
        urlRoot: '/',
	
		files: files
	};

	var server = new Server(configs);
	
	server.start();
	
	watch(paths.exeptTests, function() {
		server.refreshFiles();
	});
};
