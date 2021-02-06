/* eslint-disable no-undef */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename');

gulp.task('sass', function () {
    return gulp.src('src/assets/styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/assets/styles'));
});

gulp.task('css-libs', function () {
    return gulp.src('src/assets/styles/scss/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/assets/styles'));
});

gulp.task('watch', function () {
    gulp.watch('src/assets/styles/scss/*.scss', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('css-libs', 'sass', 'watch'));