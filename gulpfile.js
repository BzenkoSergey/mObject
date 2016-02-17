var gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
    fileinclude = require('gulp-file-include');
	
gulp.task('server', ['styles', 'styles-watch', 'html', 'html-watch', 'connect']);

gulp.task('styles', function() {
    gulp
        .src('./sass/app.scss')
        .pipe(sass.sync().on('error', sass.logError))
	    .pipe(gulp.dest('./stylesheets'));
});

gulp.task('styles-watch', function() {
	watch('./sass/**/*.scss', function(vinyl) {
		var eName = vinyl.event;
		if(eName !== 'change' && eName !== 'add') {
			return true;
		}
		console.log('SASS Watcher: ' + eName + ': ' + vinyl.path);

		gulp.start('styles');
	});
});

gulp.task('html', function() {
    gulp
        .src('./html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
	    .pipe(gulp.dest('./'));
});

gulp.task('html-watch', function() {
	watch('./html/**/*.html', function(vinyl) {
		var eName = vinyl.event;
		if(eName !== 'change' && eName !== 'add') {
			return true;
		}
		console.log('HTML Watcher: ' + eName + ': ' + vinyl.path);

		gulp.start('html');
	});
});

gulp.task('connect', function() {
	connect.server({
		root: './',
		port: 1000
	});
});