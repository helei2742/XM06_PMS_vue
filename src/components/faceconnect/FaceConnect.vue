<template>

<div class="face-connect">
  <div v-if="isShowProgress">
  <h1 style="text-align: center">
    采集进度
  </h1>
  <el-progress :text-inside="true"
               :stroke-width="24"
               :percentage="getPercentage"
               status="success">
  </el-progress>
  </div>
  <br/>

  <div class="video-box">
    <canvas id="canvas" ref="output"  width="320" height="240"></canvas>
    <video id="video" ref="video" width="320" height="240" autoplay preload muted></video>
    <canvas id="screenshotCanvas"  width="320" height="240"></canvas>
  </div>

  <div v-if="isShowButton" style="text-align: center">
    <el-button icon="el-icon-refresh-right"
               type="warning"
               @click="reset">重置</el-button>
    <el-button icon="el-icon-coordinate"
               type="success"
               @click="startConnect">开始</el-button>
  </div>

</div>

</template>

<script>

import tracking from '@/assets/tracking/build/tracking'
import '@/assets/tracking/build/data/face-min'

import {throttle,debounce} from "@/util/baseUtil";

export default {
  name: "FaceConnect",
  props: {
    //需要的图片数量
    needImgCount: {
      type: Number,
      default: 50
    },
    //人脸画框颜色
    rectColor: {
      type: String,
      default: '#00ff00'
    },
    //保存图片间隔
    imgSaveTimes: {
      type: Number,
      default: 500
    },
    isShowButton: {
      type: Boolean,
      default: true
    },
    isShowProgress: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      screenShotCanvas: null,   //截图的画布
      screenShotContext: null,
      video: null,
      imgCount: 0,
      faces: [],              //存储的图片的base64码,

      noFaceFrame: 0,      //记录没有脸出现了多少帧
      multiFaceFrame: 0    // 记录多个脸出现了多少帧
    }
  },
  computed: {
    /**
     * 保存图片节流
     */
    throttleSaveImg(){
      return throttle(this.saveImg, this.imgSaveTimes)
    },
    /**
     * 未检测到人脸警告节流
     */
    throttleNoFaceAlert() {
      return throttle(this.noFaceAlert, 5000)
    },
    /**
     * 检测到多个人脸警告节流
     */
    throttleMultiFaceAlert() {
      return throttle(this.multiFaceAlert, 5000)
    },

    /**
     * 获取收集图片进度
     */
    getPercentage(){
      return Math.floor(this.imgCount/this.needImgCount * 100)
    }
  },
  methods: {
    startConnect(){
      this.init()
    },

    reset(){
      this.imgCount = 0
      this.faces = []
      let canvas = document.getElementById('canvas')
      let context = canvas.getContext('2d')
      context.clearRect(0,0,canvas.width, canvas.height)
      this.stopMediaStreamTrack()
    },

    /**
     *
     * 初始化
     */
    init(){
      this.video = document.getElementById('video')
      this.screenShotCanvas = document.getElementById('screenshotCanvas')
      this.screenShotContext = this.screenShotCanvas.getContext('2d')

      //画框的canvas
      let canvas = document.getElementById('canvas')
      let context = canvas.getContext('2d')

      //固定写法
      let tracker = new window.tracking.ObjectTracker('face')
      tracker.setInitialScale(4)
      tracker.setStepSize(2)
      tracker.setEdgesDensity(0.1)

      window.tracking.track('#video', tracker, {
        camera: true
      })

      let _this = this
      tracker.on('track',(event)=>{

        //清除画框画布
        context.clearRect(0,0,canvas.width, canvas.height)

        if(event.data.length === 0){
          //无人脸
          // console.log('无人脸')
          if(++this.noFaceFrame > 150){
            this.throttleNoFaceAlert()
          }

        }else if(event.data.length === 1){
          this.noFaceFrame = 0
          //识别到1人脸
          event.data.forEach((rect) => {
            //画框
            context.strokeStyle = this.rectColor
            context.strokeRect(rect.x, rect.y, rect.width, rect.height)

            //需要图片数量达到要求
            if(this.imgCount >= this.needImgCount){
              this.stopMediaStreamTrack()
              tracker.removeAllListeners()
              context.clearRect(0,0,canvas.width, canvas.height)

              this.$emit('imgConnected', this.faces)
            }
            this.throttleSaveImg()
          })

        }else {
          // 多个人脸
          if(++this.multiFaceFrame>150){
            this.throttleMultiFaceAlert()
          }
        }
      })

    },

    /**
     * 保存图片方法
     */
    saveImg(){
      // console.log(this.imgCount)
      this.screenShotContext.drawImage(this.video, 0, 0,
          this.screenShotCanvas.width,this.screenShotCanvas.height);

      let imgBase64 = this.screenShotCanvas.toDataURL('image/jpg', 1)
      this.faces.push(imgBase64)
      this.imgCount ++
    },
    /**
     *  没有检测到人脸警告方法
     */
    noFaceAlert() {
      this.$message.info('长时间未检测到人脸，请适当调整位置')
    },
    /**
     *  检测到多个人脸警告方法
     */
    multiFaceAlert(){
      this.$message.info('长时间检测到多个人脸， 请调整位置')
    },
    /**
     * 关闭 tracking 打开的媒体流， 需更改tracking文件，将流绑定到window.stream上
     */
    stopMediaStreamTrack(){
      if(typeof window.stream === 'object'){
        this.video.srcObject = null
        window.stream.getTracks().forEach(track => track.stop())
      }
    }
  }
}
</script>

<style scoped>

.face-connect{
  padding: 5px;
  box-shadow: 0 0 1px rgba(100,100,100,0.3);
}

.face-connect #screenshotCanvas{
  display: none;
  z-index: 9;
}
.face-connect .video-box{
  margin: 0 auto;
  position: relative;
  /*width: 100%;*/
  /*height: 100%;*/
  width: 320px;
  height: 300px;
}
.face-connect #video,#canvas{
  /*width: 100%;*/
  /*height: 100%;*/
  width: 320px;
  height: 240px;
  position: absolute;
  top:0;
  left: 0;
  border: #666666 1px solid;
}
.face-connect #canvas{
  z-index: 10;
}
</style>