module.exports = {
  dev: {
    bsFiles: {
      src: '<%= config.app %>/styles/style.css'
    },
    options: {
      watchTask: false,
      debugInfo: true,
      // Change to 0.0.0.0 to access externally
      host: 'http://localhost:<%= connect.options.port %>',
      server: {
        baseDir: '<%= config.app %>'
      },
      ghostMode: {
        clicks: true,
        scroll: true,
        links: true,
        forms: true
      }
    }
  }
};
