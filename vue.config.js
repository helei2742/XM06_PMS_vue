module.exports = {
  // 基本路径
  publicPath: "./",
/*  // 相对于打包路径index.html的路径
  indexPath: "index.html",
  // 文件输出目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 生成的静态资源存放的目录
  assetsDir: "static",*/

  devServer: {
    proxy: {
      '/api': {
        // target: 'http://music.163.com',
        // target: 'http://qqmusic.qq.com/',
        target: 'https://c.y.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }

}
