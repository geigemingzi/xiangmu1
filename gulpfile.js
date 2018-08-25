// gulp 代码写在这里  这里的代码在 nodejs环境执行

// 引用
let gulp = require('gulp');
let sass = require('gulp-sass');

// 创建任务
gulp.task('byCss',function(){
    
    // 引入路径
    gulp.src('./src/sass/index1.scss')
    // 编译处理
    .pipe(sass({outputStyle:'compact'}))
    // 输出到硬盘
    .pipe(gulp.dest('./src/css/'));
});

// 自动化编译  监听文件修改
gulp.task('autoSass',function(){
    // 监听文件修改 如果有修改  执行上面的 byCss 任务
    gulp.watch('./src/sass/index1.scss',['byCss']);
});