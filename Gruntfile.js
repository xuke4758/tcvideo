module.exports = function(grunt) {

  var dest_path = grunt.option('path') || 'dist/';
  // var dest_path = 'gen/';

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: './public',
          src: [
            '{asset,js}/**/*.*'
          ],
          dest: dest_path
        }]
      }
    },
    imagemin: {
      /* 压缩图片大小 */
      dist: {
          options: {
              optimizationLevel: 3 //定义 PNG 图片优化水平
          },
          files: [{
              expand: true,
              cwd: dest_path,
              src: ['asset/**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
              dest: dest_path // 优化后的图片保存位置，覆盖旧图片，并且不作提示
          }]
      }
    },

    clean: {
      dist: {
        force: true,
        src: [
          dest_path
        ]
      }
    }

  });

  // Load tasks
  require('load-grunt-tasks')(grunt);


  grunt.registerTask('default', [
    'clean',
    'copy',
    'imagemin'
  ]);

  grunt.registerTask('test', [
    'copy'
  ]);


};