var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    jshint          = require('gulp-jshint'),
    browserify      = require('gulp-browserify'),
    concat          = require('gulp-concat'),
    livereload      = require('gulp-livereload'),
    clean           = require('gulp-clean');


livereload.listen();

// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
  .pipe(jshint())
  .on('error', gutil.log)
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});




//      * ==========================================  *

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .on('error', gutil.log)
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('public/js'))
  .pipe(livereload());
});


//      * ==========================================  *

gulp.task('watch', ['lint','browserify'], function() {
  // Watch our scripts
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],['lint','browserify']);
});





//      * ==========================================  *


// Views task
gulp.task('views', function() {

  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('public/'))
  .pipe(livereload());


  // Any other view files from app/views
  gulp.src('./app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'))
  .pipe(livereload());
  
});


// Watch change in HTML Files
gulp.watch(['app/index.html', 'app/views/**/*.html'], [
  'views'
]);



//      * ==========================================  *

gulp.task('files', function() {
  gulp.src('./app/files/**/*')
  .pipe(gulp.dest('dist/files/'));
});

// Watch change in FILES Folder
gulp.watch('./app/files/**/*', [
  'files'
]);



// Styles task
gulp.task('styles',function(){
  gulp.src('app/styles/**/*.css')
  // Make single file
  .pipe(concat('css_bundle.css'))
  // And put it in the dist folder
  .pipe(gulp.dest('dist/css'));
});


// Watch changes in CSS Files
gulp.watch(['app/styles/**/*.css'], [
  'styles'
]);


//Fonts Task
gulp.task('fonts',function(){
  gulp.src('app/styles/css/icons/fonts/*')
  .pipe(gulp.dest('dist/files/fonts'))
});

// Watch changes in Font Files
gulp.watch(['app/styles/css/icons/fonts/*'], [
  'fonts'
]);



// Clean Views
gulp.task('clean-scripts', function () {
  gulp.src(['dist/views/**/*'], {read: false})
    .pipe(clean());
});



//      * ==========================================  *

// Main task
gulp.task('default',['clean-scripts', 'watch','views', 'styles', 'files', 'fonts']);