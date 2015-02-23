var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    inject = require('gulp-inject'),
    assets = require('./config/assets.json');




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

gulp.task('clean', function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
});


gulp.task('default', ['lint', 'inject'], function() {
    // place code for your default task here
});