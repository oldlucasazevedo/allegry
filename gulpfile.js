'use strict';
// generated on 2014-06-09 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var less = require('gulp-less-sourcemap');
var Combine = require('stream-combiner');
var path = require('path');

// load plugins
var $ = require('gulp-load-plugins')();
var lessPath = 'app/styles/less/';

//go forward
gulp.task('styles', ['copy'], function () {
    var combined = Combine (
            gulp.src([lessPath+'*.less', '!'+ lessPath +'utils.less', '!'+ lessPath +'grid.less']),
            less({
                generateSourceMap: true,
                sourceMapRootpath:'less'
            }),
            $.autoprefixer(['last 2 version', '> 1%', 'ie 8', 'ie 7'], {cascade: true}),
            gulp.dest('app/styles'),
            $.size()
        );
        combined.on('error', function(err) {
            console.warn(err.message);
        });

        return combined;
});

//this is necessary to keep paths smooth into sourcemap
gulp.task('copy', function () {
    var combined = Combine (
            gulp.src('app/bower_components/semantic-grid/stylesheets/less/grid.less'),
            gulp.dest('app/styles/less')
        );
        combined.on('error', function(err) {
            console.warn(err.message);
        });

        return combined;
});

gulp.task('scripts', function () {
    var combined = Combine (
            gulp.src('app/scripts/**/*.js'),
            $.jshint(),
            $.jshint.reporter(require('jshint-stylish')),
            $.size()
        );
        combined.on('error', function(err) {
            console.warn(err.message);
        });

        return combined;
});

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var combined = Combine (
            gulp.src('app/*.html'),
            $.useref.assets({searchPath: '{.tmp,app}'}),
            jsFilter,
            $.uglify(),
            jsFilter.restore(),
            cssFilter,
            $.csso(),
            cssFilter.restore(),
            $.useref.restore(),
            $.useref(),
            gulp.dest('dist'),
            $.size()
        );
        combined.on('error', function(err) {
            console.warn(err.message);
        });

        return combined;
});

gulp.task('images', function () {
    var combined = Combine(
            gulp.src('app/images/**/*'),
            $.cache($.imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            })),
            gulp.dest('dist/images'),
            $.size()
        );
        combined.on('error', function(err) {
            console.warn(err.message);
        });

        return combined;
});

gulp.task('fonts', function () {
    var combined = Combine(
            $.bowerFiles(),
            $.filter('**/*.{eot,svg,ttf,woff}'),
            $.flatten(),
            gulp.dest('dist/fonts'),
            $.size()
        );
        combined.on('error', function(err) {
            console.warn(err.message)
        });

        return combined;
});

gulp.task('extras', function () {
    var combined = Combine(
            gulp.src(['app/*.*', '!app/*.html'], { dot: true }),
            gulp.dest('dist')
        );
        combined.on('error', function(err) {
            console.warn(err.message)
        });

        return combined;
});

gulp.task('clean', function () {
    var combined = Combine(
            gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean())
        );
});

gulp.task('build', ['html', 'images', 'fonts', 'extras']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.less')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/*.html',
        'app/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/styles/**/*.less', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
