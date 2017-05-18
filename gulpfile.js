"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var watchify = require('watchify'); // watch mode for browserify builds
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var notifier = require('node-notifier');
var sass = require('gulp-sass');

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		jsx: './src/**/*.jsx',
		images: './src/images/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      		'node_modules/toastr/toastr.css'
    	],
		sass:'./src/sass/**/*.scss',
		dist: './dist',
		mainJs: './src/main.jsx'
	}
};

var notify = function(error) {
	var message = 'In: ';
	var title = 'Error: ';

	if(error.description) {
		title += error.description;
	} else if (error.message) {
		title += error.message;
	}

	if(error.filename) {
		var file = error.filename.split('/');
		message += file[file.length-1];
	}

	if(error.lineNumber) {
		message += '\nOn Line: ' + error.lineNumber;
	}

	notifier.notify({title: title, message: message});
};

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

var bundler = watchify(browserify({
	entries: ['./src/main.jsx'],
	transform: [reactify],
	extensions: ['.jsx'],
	debug: true,
	cache: {},
	packageCache: {},
	fullPaths: true
}));

function bundle() {
	return bundler
		.bundle()
		.on('error', notify)
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
}
bundler.on('update',bundle);

gulp.task('jsx', function() {
	bundle();
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('sass', function () {
    gulp.src(config.paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

// Migrates images to dist folder
// Note that I could even optimize my images here
gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    //publish favicon
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function() {
	return gulp.src(config.paths.jsx)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.jsx, ['jsx', 'lint']);
    gulp.watch(config.paths.sass, ['scss', 'lint']);
});

gulp.task('default', ['html', 'jsx', 'css','sass', 'images', 'lint', 'open', 'watch']);