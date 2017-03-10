var gulp=require('gulp');
var sass=require('gulp-sass');
var notify=require('gulp-notify');
var uglify=require('gulp-uglify');
var connect=require('gulp-connect');
var concat=require('gulp-concat');

var config={
    root:'src',//根目录
    watchGlob:[root+'/scss/**/*.scss',root+'/js/**/*.js',root+'/view/**/*.html'],//监控目录
    jslib:jsLib=[
        root+'/js/src/libs/jquery.js',
        root+'/js/src/libs/jquery.ui.js',
        root+'/js/src/libs/jquery.fullPage.js'
    ],
    jsmain:[   root+'/js/src/lib.js',
        root+'/js/src/h5_component_base.js',
        root+'/js/src/h5.js',
        root+'/js/src/PointComponent.js',
        root+'/js/src/BargraphComponent.js',
        root+'/js/src/LinechartComponent.js',
        root+'/js/src/RadarComponent.js',
        root+'/js/src/CakeComponent.js'
    ]
};

gulp.task('css',function(){
   gulp.src(config.root+'/scss/component.scss')
       .pipe(sass())
       .pipe(gulp.dest(config.root+'/css'))
       .pipe(connect.reload())
       .pipe(notify({
          message:"finish scss compile!"
       }));
});

gulp.task('jslib',function(){
   gulp.src(config.jslib)
       .pipe(concat("lib.js"))
       .pipe(gulp.dest(config.root+"/js/src"))
       .pipe(notify({
           message:"finish jsLib uglify!"
       }));
});

gulp.task('js',function(){
    gulp.src(config.jsmain)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(config.root+'/js'))
        .pipe(connect.reload())
        .pipe(notify({
            message:"finish js uglify!"
        }));
});

gulp.task('watch', function () {
   gulp.watch(config.watchGlob,['css','jslib','js']);
});

gulp.task('connect',function(){
    connect.server({
        root:config.root
    });
});

gulp.task('copyview',function () {
   gulp.src('src/view/*.html')
       .pipe(gulp.dest('dest'));
});

gulp.task('default',['css','jslib','js','copyview','watch','connect']);