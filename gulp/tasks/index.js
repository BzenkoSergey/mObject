var paths = require('./../paths.js'),
	libs = require('./../libs.js'),
	gulp = libs.gulp;

module.exports = function() {
	return gulp.src(paths.indexHtml)
		.pipe(gulp.dest(paths.release));
};
