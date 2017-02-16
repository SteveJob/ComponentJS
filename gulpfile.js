var gulp=require('gulp');
var sass=require('gulp-sass');
var notify=require('gulp-notify');
var uglify=require('gulp-uglify');
var connect=require('gulp-connect');
var concat=require('gulp-concat');

//根目录
var root='./src';


//监控目录
var watchedGlob=[root+'/scss/**/*.scss',root+'/js/**/*.js',root+'/view/**/*.html'];

var jsLib=[
        root+'/js/src/libs/jquery.js',
        root+'/js/src/libs/jquery.ui.js',
        root+'/js/src/libs/jquery.fullPage.js'
    ];

var jsMain=
    [   root+'/js/src/lib.js',
        root+'/js/src/h5_component_base.js',
        root+'/js/src/h5.js'
    ];
//
//gulp.task('bower',function(){
//    gulp.src(root+'/bower')
//})

//编译scss
gulp.task('css',function(){
   gulp.src(root+'/scss/component.scss')
       .pipe(sass())
       .pipe(gulp.dest(root+'/css'))
       .pipe(connect.reload())
       .pipe(notify(
           {
              message:"finish scss compile!"
           }))
});


gulp.task('jslib',function(){
   gulp.src(jsLib)
       .pipe(concat("lib.js"))
       .pipe(gulp.dest(root+"/js/src"))
       .pipe(notify({
           message:"finish jsLib uglify!"
       }))
});

//压缩js
gulp.task('js',function(){
    gulp.src(jsMain)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(root+'/js'))
        .pipe(connect.reload())
        .pipe(notify(
            {
                message:"finish js uglify!"
            }
        ))
});

//监控js和scss目录 重新压缩和编译
gulp.task('watch', function () {
   gulp.watch(watchedGlob,['css','jslib','js']);
});

gulp.task('connect',function(){
    connect.server({
        root:root
    })
});

gulp.task('dev',['css','jslib','js','watch','connect']);