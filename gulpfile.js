var gulp = require('gulp')
var autoprefixer = require('gulp-autoprefixer')
var uglify = require('gulp-uglify')
var cleanCSS = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync').create()
var reload = browserSync.reload

gulp.task('dist', [
    'styles',
    'copy-fonts',
    'copy-html',
    'scripts-dist'
  ]
)
gulp.task('serve', ['styles', 'scripts'], function () {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  })
})
gulp.task('scripts-dist', function () {
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('scripts', function () {
  gulp.src('./js/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({stream: true}))
})

gulp.task('styles', function () {
  gulp.src('./css/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({stream: true}))
})

gulp.task('copy-html', function () {
  gulp.src('./*.html')
    .pipe(gulp.dest('./dist'))
})

gulp.task('copy-fonts', function () {
  gulp.src('./fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
})

gulp.watch('*.html').on('change', reload)

gulp.task('default', ['serve'])
