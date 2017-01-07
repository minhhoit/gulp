var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-clean-css');

// Lint Task
gulp.task('lint', function() {
   return gulp.src('js/dist/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});

// Sass Task
gulp.task('sass', function() {
  return gulp.src('sass/style.sass')
        .pipe(sass())
        .pipe(cssmin({keepSpecialComments : 0}))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('css'));
});

// Minify Task Css
gulp.task('minifycss', function() {
  return gulp.src('css/style.css')
    .pipe(cssmin({keepSpecialComments : 0}))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
   return gulp.src(['js/dist/*.js'])
       .pipe(concat('app.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
   gulp.watch('js/dist/*.js', ['lint', 'scripts']);
   gulp.watch('sass/style.sass', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'sass', 'watch']);