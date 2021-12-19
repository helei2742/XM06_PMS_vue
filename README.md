# 人脸模块
```
    前端人脸识别使用的代码为 src/assets/js/face-min.js
                         src/assets/js/tracking.js
    主要是通过其在前端捕获摄像头采集画面中的人脸，采集到的人脸转为base64编码后发送到后端处理
    
    封装采集人脸的组件在 src/components/faceconnect/FaceConnect.vue
其他页面都是引入该组件进行人脸采集的

```

# vue-pms

```
需按装 element
    npm i element-ui -S

vue脚手架
  通过指令  npm install -g @vue/cli 安装脚手架
  再安装   npm install -g @vue/cli-init  后可用3或2
```



## Project setup
```
npm install
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
