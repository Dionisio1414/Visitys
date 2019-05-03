var syntax        = 'sass'; // Syntax: sass or scss;
var gulpversion = '4'; // Gulp version 3 or 4;

var gulp              = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rsync         = require('gulp-rsync'),
    imagemin      = require('gulp-imagemin'),
    del 					= require('del');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
        'app/libs/slick-carousel/slick/slick.js',
        'app/libs/jqueryUi/jquery-ui.js',
        'app/libs/niceScroll/jquery.nicescroll.js',
        'app/js/common.js'
		])
	.pipe(concat('scripts.min.js'))
    .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

//gulp.task('rsync', function() {
//	return gulp.src('app/**')
//	.pipe(rsync({
//		root: 'app/',
//		hostname: 'username@yousite.com',
//		destination: 'yousite/public_html/',
//		// include: ['*.htaccess'], // Includes files to deploy
//		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
//		recursive: true,
//		archive: true,
//		silent: false,
//		compress: true
//	}))
//});

gulp.task('imgminimization', function() {
    gulp.src('app/img/**/*.{jpg,jpeg,png}')
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest('app/min'))
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('build', ['clean', 'styles', 'js'], function() {
	
	var buildCss = gulp.src([
	'app/css/main.min.css',
	])
	.pipe(gulp.dest('dist/css'));
	
	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
	
	var buildImg = gulp.src('app/img/**/*')
	.pipe(gulp.dest('dist/img'));
	
	var buildJs = gulp.src([
		'app/js/scripts.min.js'
	])
	.pipe(gulp.dest('dist/js'));

	var buildLibs = gulp.src([
		'app/libs/images/**/*'
	])
	.pipe(gulp.dest('dist/libs/images'));
	
	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);