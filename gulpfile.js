var libs = require('./gulp/libs.js'),
	gulp = libs.gulp;

gulp.task('index', require('./gulp/tasks/index.js'));
gulp.task('scripts', require('./gulp/tasks/scripts.js'));
gulp.task('watch', require('./gulp/tasks/watch.js'));
gulp.task('server', require('./gulp/tasks/server.js'));
gulp.task('tests', require('./gulp/tasks/tests.js'));
gulp.task('default', ['tests', 'index', 'scripts', 'watch', 'server']);
