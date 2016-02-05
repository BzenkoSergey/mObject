var paths = require('./../paths.js'),
	libs = require('./../libs.js'),
	utils = require('./../utils.js'),
	gulp = libs.gulp,
	concat = libs.concat,
	wrap = libs.wrap;

module.exports = function() {
	return gulp.src(utils.appFilesPaths())
		.pipe(concat('mObject.js'))
		.pipe(wrap('(function(window) {\n\r <%= contents %> \n\r})(window);'))
		.pipe(gulp.dest(paths.release));
};
