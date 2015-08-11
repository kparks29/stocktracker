/* jshint node: true */

(function () {
'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	plugins = gulpLoadPlugins(),
	runSequence = require('run-sequence'),
	stylish = require('jshint-stylish'),
	paths = {
		src: 'src',
		sass: 'src/sass/main.scss'
	};

gulp.task('lint', function () {
	return gulp.src([
		paths.src + '/**/*.js',
		'!' + paths.src + '/**/**.spec.js',
		'!' + paths.src + '/lib/**/*.js'
		])
		.pipe(plugins.jshint('.jshintrc'))
		.pipe(plugins.jshint.reporter(stylish))
		.pipe(plugins.jshint.reporter('fail'));
});

gulp.task('test', function (cb) {
	var server = require('karma').server;
	server.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, cb);
});

gulp.task('install', function () {
	return bower.commands.update()
		.on('log', function(data) {
			plugins.util.log('bower', plugins.util.colors.cyan(data.id), data.message);
		});
});

gulp.task('sass', function () {
	return gulp.src(paths.sass)
		.pipe(plugins.sass())
		.pipe(gulp.dest(paths.src + '/'));
});

gulp.task('serve', ['watch'], function() {
	return gulp.src(paths.src)
		.pipe(plugins.webserver({
			host: 'localhost',
			port: 8100,
			livereload: {
				enable: true,
				port: 8180
			},
			directoryListing: false
		}));
});

gulp.task('watch', function() {
	return gulp.watch(paths.sass, ['sass']);
});

// combine js, move the updated html files to www folder
// gulp.task('minify', function () {
// 	return gulp.src(paths.src + '/*.html')
// 		.pipe(plugins.usemin({
// 			css: [plugins.minifyCss(), 'concat'],
// 			libjs: ['concat'],
// 			appjs: [plugins.ngAnnotate(), 'concat', plugins.uglify()]
// 		}))
// 		.pipe(gulp.dest(paths.build + '/www'));
// });

// generate a todo.md from your javascript files
gulp.task('todo', function() {
	gulp.src([
		paths.src + '/**/*.js',
		'!' + paths.src + '/lib/**/*.js'
		])
		.pipe(plugins.todo())
		.pipe(gulp.dest('./'));
		// -> Will output a TODO.md with your todos
});

/* sequenced tasks */
gulp.task('default', ['build']);

// debug in browser
gulp.task('build', function () {
	runSequence('install', 'sass', 'serve');
});

})();