/* jshint node: true */

(function () {
'use strict';

var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	stylish = require('jshint-stylish'),
	bower = require('gulp-bower'),
	sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
	webserver = require('gulp-webserver'),
	todo = require('gulp-todo'),
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
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});

gulp.task('test', function (cb) {
	var server = require('karma').server;
	server.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, cb);
});

gulp.task('install', function () {
	return bower({ cmd: 'update'});
});

gulp.task('sass', function () {
	return gulp.src(paths.sass)
		.pipe(sass())
		.pipe(gulp.dest(paths.src + '/'));
});

gulp.task('serve', ['watch'], function() {
	return gulp.src(paths.src)
		.pipe(webserver({
			host: 'localhost',
			port: 8080,
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
// 		.pipe(usemin({
// 			css: [minifyCss(), 'concat'],
// 			libjs: ['concat'],
// 			appjs: [ngAnnotate(), 'concat', uglify()]
// 		}))
// 		.pipe(gulp.dest(paths.build + '/www'));
// });

// generate a todo.md from your javascript files
gulp.task('todo', function() {
	gulp.src([
		paths.src + '/**/*.js',
		'!' + paths.src + '/lib/**/*.js'
		])
		.pipe(todo())
		.pipe(gulp.dest('./'));
		// -> Will output a TODO.md with your todos
});

/* sequenced tasks */
gulp.task('default', ['sass', 'serve']);

// debug in browser
gulp.task('build', function () {
	runSequence('install', 'todo', 'sass', 'serve');
});

})();