var paths = require('./../paths.js'),
	libs = require('./../libs.js'),
	gulp = libs.gulp,
	watch = libs.watch,
	livereload = libs.livereload;

module.exports = function() {
	livereload.listen();

	watch(paths.src, function(vinyl) {
		gulp.start('scripts');
		livereload.changed('JS WATHER: ' + vinyl.event + ' file ' + vinyl.path);
    });
};
