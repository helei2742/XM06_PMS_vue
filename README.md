# vue-pms

```
   此项目为四川大学计算机与科学学院研究与开发实践课设vue前端
```



## Project setup
```

vue脚手架
  通过指令  npm install -g @vue/cli 安装脚手架
  再安装   npm install -g @vue/cli-init  后可用3或2

需按装 element
    npm i element-ui -S
Echart
    npm install echarts@5.2.2 --save

更多请自行阅读package.json 文件
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm install --save-dev webpack-bundle-analyzer


npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
"# XM06_PMS_vue" 

### 一些配置项
```
    在src/config/index.js中
        如下
        /**
         * router基本路径名
         * @type {string}
         */
        export const BACECONTEXTPATH = '/XM06/'
        
        /**
         * 通知模块的websocket连接地址
         * @type {string}
         */
        export const INFORMWEBSOCKETURL = 'ws://localhost:9000/XM06/api/websocket'
        
        /**
         * 请求api的 地址
         * @type {string}
         */
        export const REQUESTAPIURL = 'http://localhost:9000/XM06'
        
        /**
         * 文件下载接口地址
         * @type {string}
         */
        export const FILEDOWNLOADURL = 'http://localhost:9000/XM06/file/download'
```