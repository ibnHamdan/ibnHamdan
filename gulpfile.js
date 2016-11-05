var gulp = require('gulp');
var browser = require('browser-sync');
var panini = require('panini');
var sass = require('gulp-sass');

gulp.task('build', ['panini', 'javascript',  'sass']);



gulp.task('panini', function(){
  return gulp.src('src/pages/**/*.html')
    .pipe(panini({
        root:'src/pages/',
        layouts: 'src/layouts/'
    }))
    .pipe(gulp.dest('_build'));
});


gulp.task('javascript', function() {
  return gulp.src(['assts/js/*.js','bower_components/jquery/dist/jquery.js', 'bower_components/foundation-sites/dist/foundation.js'])
    .pipe(gulp.dest('_build/js'));
});


gulp.task('sass', function() {
  return gulp.src(['assets/scss/*', 'bower_components/foundation-sites/dist/foundation.css', 'bower_components/Ionicons/css/ionicons.css'])
  .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('_build/css'));
});



gulp.task('server',['build'], function(){
    browser.init({server:'_build',})
});



gulp.task('watch', function(){
    gulp.watch('src/layouts/**/*',  ['panini', browser.reload]);
    gulp.watch('src/pages/**/*',  ['panini', browser.reload]);
    gulp.watch('assets/js/**/*', ['javascript', browser.reload]);
    gulp.watch('assets/scss/**/*', ['sass', browser.reload]);
});

gulp.task('default', ['server','watch']);