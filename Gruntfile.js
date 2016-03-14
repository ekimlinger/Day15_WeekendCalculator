module.exports = function(grunt){
  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'client/app.js',
        dest: 'server/public/assets/scripts/app.min.js'
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: "node_modules",
        src: [
          "jquery/dist/jquery.min.js",
        ],
        dest: "server/public/vendors/"
      },
      bootstrap: {
        expand: true,
        cwd: "node_modules/bootstrap/dist/css/",
        src: [
          "bootstrap.min.css",
          "bootstrap.min.css.map"
        ],
        dest: "server/public/vendors/bootstrap"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['copy','uglify']);

}
