<template>
<div class="face-info-register">

  <ShowWindow>
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>人脸信息管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>人脸信息录入</span>
    </div>

    <div slot="main">
      <el-button @click="startFaceInfoReg">立即录入</el-button>
      <el-button @click="uploadVideo">选择视频上传录入</el-button>
    </div>
  </ShowWindow>


  <el-dialog
      title="人脸采集"
      :visible.sync="isStart"
      :before-close="handleClose"
      :fullscreen="true"
      >

    <div>当前采集了{{imgCount}}</div>
    <div style="position: relative" v-if="!isFaceImgUploadSuccess" >
      <canvas id="output" ref="output"></canvas>
      <video id="video" ref="video" src="" autoplay></video>
    </div>

    <div v-else>
      信息上传完毕
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="!isFaceImgUploadSuccess" type="primary"
                 @click="handleYes">
        确 定
      </el-button>
    </span>

  </el-dialog>

</div>
</template>

<script>
import ShowWindow from '@/components/showwindow/ShowWindow'
import {uploadFacesNetWork} from "@/network/file";


export default {
  name: "FaceInfoRegister",
  components: {
    ShowWindow
  },
  data(){
    return {
      isStart: false,
      isFaceImgUploadSuccess: false,
      back: null,
      backContext: null,
      interval: null,
      video: null,
      mediaStream: null,
      imgCount: 0,
      needImgCount: 70,
      faces: []
    }
  },
  methods: {
    /**
     *  点击确定
     */
    handleYes(){
      this.reset()
      this.isStart = false
    },
    /**
     * 点击关闭
     */
    handleClose(done) {
      console.log('---')
      this.$confirm('将取消人脸信息录入，确认关闭？')
          .then(_ => {
            this.reset()
            done();
          })
          .catch(_ => {});
    },

    /**
     * 点击立即采集按钮调用
     */
    startFaceInfoReg() {
      this.$message.warning('3秒后开始采集人像')

      setTimeout(()=>{

        navigator.mediaDevices.getUserMedia({video:true}).then(stream => {
          this.mediaStream = stream
          document.getElementById("video").srcObject = this.mediaStream

          if(this.interval != null) clearInterval(this.interval)
          this.interval = null
          this.init()
          this.$message('人脸采集已开始')

        }).catch(error => {
          console.log(error)
        })

        this.isStart = true
      }, 3000)

    },
    uploadVideo(){

    },

    /**
     * 重置人脸采集
     */
    reset(){
      this.isFaceImgUploadSuccess = false
      this.interval = null
      this.mediaStream =  null
      this.imgCount = 0
      this.faces = []
    },

    /***
     * 初始化人脸采集
     */
    init(){
      this.back = this.$refs.output
      this.backContext = this.$refs.output.getContext('2d')
      this.video = this.$refs.video

      this.interval = setInterval(() => {
        this.backContext.drawImage(this.video,0,0,this.back.width,this.back.height)
        let imgBase64 = this.back.toDataURL('image/jpg', 1);
        this.faces.push(imgBase64)

        if(++this.imgCount >= this.needImgCount) {
          clearInterval(this.interval)
          //关掉媒体流
          this.mediaStream.getTracks()[0].stop()
          this.uploadFaces(this.faces)
        }
      }, 300)

    },

    /**
     * 网络请求上传脸的base64码
     * @param faces
     */
    uploadFaces(faces){
      let uid = this.$store.getters.getLoginUser.id
      console.log(faces)
      let json = JSON.stringify(faces)

      const loading = this.$loading({
        lock: true,
        text: '正在上传分析人类信息',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      uploadFacesNetWork(uid, json).then(data => {
        if(data.code === 200) {
          this.isFaceImgUploadSuccess = true
          loading.close()
        }else {
          this.$alert('人脸信息上传失败,' + data.msg)
          loading.close()
        }
      }).catch(e=>{
        loading.close()
      })
    }

  }

}
</script>

<style scoped>

#video{
  width: 100%;
  height: 80vh;
}

#output{
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 80vh;
}
</style>