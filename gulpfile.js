'use strict';

// gulpプラグインの読みこみ
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var rubySass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
// var browserSync = require('browser-sync');

var path = {
    'root': './docs',
    'imgPath': './docs/img',
    'sassPath': './docs/sass/parts',
    'cssPath': './docs/css',
    'jsPath': './docs/js'
};

// browserSync起動・livereload

// gulp.task('launchBrowserSync', function () {
//     browserSync({
//         server: {
//             baseDir: path.root
//         },
//         port: 7373
//     });
// });

// webserver起動・livereload

gulp.task('server', function () {
    return gulp.src([path.root])
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('css', function() {
    return rubySass('docs/css/sass/base.scss', {
        style: 'expanded',
        sourceMap: false,
        sourceComments: false
    })
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err.messageFormatted);
            this.emit('end');
        }
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(path.cssPath));
});

//watch

gulp.task('watch',function () {
    gulp.watch('docs/css/sass/parts/*.scss', ['css']);
    // gulp.watch('docs/**/*', function () {
    //     browserSync.reload();
    // })
});

gulp.task('default', ['watch', 'server']);
