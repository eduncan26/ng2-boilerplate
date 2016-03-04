var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var clean = require('gulp-clean');
var typings = require('gulp-typings');

gulp.task('build', ['build:server', 'build:client']);

gulp.task('build:server', () => {
	var tsProject = ts.createProject(__dirname + '/server/tsconfig.json');
	return gulp.src(path.join(__dirname + '/server/**/*.ts'))
		.pipe(ts(tsProject))
		.js
		.pipe(gulp.dest(path.resolve('./server')));
});

gulp.task('build:client', ['sass'], () => {
	var tsProject = ts.createProject(__dirname + '/public/tsconfig.json');
	return gulp.src(path.join(__dirname + '/public/**/*.ts'))
		.pipe(ts(tsProject))
		.js
		.pipe(gulp.dest(path.resolve('./public')));
});

gulp.task('sass', ['sass:cleanup']);

gulp.task('sass:compile', () => {
	return gulp.src([__dirname + '/public/**/*.sass', __dirname + '/public/**/*.scss'])
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest(__dirname + '/public/.tmp/css'));
});

gulp.task('sass:cleanup', ['concat:css'], () => {
	return gulp.src(__dirname + '/public/.tmp/css')
		.pipe(clean());
});

gulp.task('concat:css', ['sass:compile'], () => {
	return gulp.src(__dirname + '/public/.tmp/css/**/*.css')
		.pipe(concatCss('app.css'))
		.pipe(gulp.dest(__dirname + '/public/css'));
});

gulp.task('start', ['build'], () => {
	nodemon({
		script: 'server/server.js',
		ext: 'js html',
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task('typings', ['typings:server', 'typings:client']);

gulp.task('typings:server', () => {
	return gulp.src(__dirname + '/server/typings.json')
		.pipe(typings());
});

gulp.task('typings:client', () => {
	return gulp.src(__dirname + '/public/typings.json')
		.pipe(typings());
});
