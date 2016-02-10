var gulp = require('gulp'),
	connect = require('gulp-connect');

gulp.task('server', function() {
	connect.server({
		root: './',
		port: 1000
	});
});