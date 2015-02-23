var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    inject = require('gulp-inject'),
    assets = require('./config/assets.json'),
    concat = require('gulp-concat');


gulp.task('lint', function () {
    return gulp.src('./js/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('inject', function () {
    var target = gulp.src('./index.html');

    var csssources = gulp.src(assets.core.css, {read: false});
    var jssources = gulp.src(assets.core.js, {read: false});

    return target
        .pipe(inject(csssources))
        .pipe(inject(jssources))
        .pipe(gulp.dest('./'));
});

gulp.task('clean:dist', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});


gulp.task('css:dist',  function () {

    return gulp.src(assets.core.css)
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/css'));


});

gulp.task('js:dist', function () {

    return gulp.src(assets.core.js)
        .pipe(jshint())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/js'));


})

gulp.task('inject:dist', ['js:dist', 'css:dist'], function () {
    var target = gulp.src('./dist/index.html');

    return target
        .pipe(inject(gulp.src('./dist/css/**/*.min.css')))
        .pipe(inject(gulp.src('./dist/js/**/*.min.js')))
        .pipe(gulp.dest('./dist'));


});

gulp.task('clone:dist', ['clean:dist'], function () {

    var filesToMove = [
        './views/**',
        './alarm.mp3',
        './background.js',
        './manifest.json',
        './index.html',
        './icon.png'
    ];

    return gulp.src(filesToMove, {base: './'})
        .pipe(gulp.dest('dist'));


});


gulp.task('default', ['lint', 'inject'], function () {
    // place code for your default task here
});


gulp.task('dist', ['clone:dist', 'inject:dist'], function () {
});