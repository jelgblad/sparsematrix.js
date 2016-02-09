var gulp = require('gulp');
var concat = require('gulp-concat-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

var fs = require('fs');

gulp.task('build', ['concat', 'minify']);

gulp.task('concat', function () {
    // return gulp.src(['./module.js', './src/*.js'])
    //     .pipe(concat('sparsematrix.js'))
    //     .pipe(concat.header('\'use strict\';\n(function() {\n'))
    //     .pipe(concat.footer('\n}).call(this);'))
    //     .pipe(gulp.dest('dist'))
    //     .pipe(uglify())
    //     .pipe(rename({
    //         suffix: '.min'
    //     }))
    //     .pipe(gulp.dest('dist'));
    
    var srcFiles = fs.readdirSync('./src');
    var srcData = '';

    srcFiles.forEach(function (file) {
        srcData += fs.readFileSync('./src/' + file, 'utf8') + '\n';
    });

    return gulp.src('./module.js')
        .pipe(rename('sparsematrix.js'))
        .pipe(replace('///modulescript', srcData))
        .pipe(gulp.dest('dist'))
});

gulp.task('minify', ['concat'], function () {
    return gulp.src('./dist/sparsematrix.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));
});