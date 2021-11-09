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
      <el-button @click="uploadVideo">立即选择视频上传录入</el-button>
    </div>
  </ShowWindow>


  <el-dialog
      title="人脸采集"
      :visible.sync="isStart"
      :before-close="handleClose"
      :fullscreen="true"
      >

    <div style="position: relative" v-if="!isFaceImgUploadSuccess" >
      <canvas id="output" ref="output"></canvas>
      <video id="video" ref="video" src="" poster="@/assets/logo.png" autoplay></video>
    </div>
    <div v-else>
      信息上传完毕
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancle">取 消</el-button>
      <el-button :disabled="!isFaceImgUploadSuccess" type="primary" @click="dialogVisible = false">
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
      faces: []
    }
  },
  methods: {
    handleClose(done) {
      console.log('---')
      this.$confirm('将取消人脸信息录入，确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
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
    init(){
      this.back = this.$refs.output
      this.backContext = this.$refs.output.getContext('2d')
      this.video = this.$refs.video

      this.interval = setInterval(() => {
        this.backContext.drawImage(this.video,0,0,this.back.width,this.back.height)
        let imgBase64 = this.back.toDataURL('image/jpg', 1);
        this.faces.push(imgBase64)
        if(++this.imgCount >= 5) {
          clearInterval(this.interval)
          this.mediaStream.getTracks()[0].stop()

          this.uploadFaces(this.faces)
        }
      }, 500)

    },
    uploadFaces(faces){
      let uid = this.$store.getters.getLoginUser.id
      console.log(faces)
      let json = JSON.stringify(faces)

      uploadFacesNetWork(uid, json).then(data => {
        if(data.code === 200) {
          this.$alert('人脸信息上传至服务器成功')
          this.isFaceImgUploadSuccess = true
        }else {
          this.$alert('人脸信息上传失败')
        }
      })
    }
  }

}
</script>

<style scoped>

#video{
  width: 100%;
  height: 80vh;
  border: 1px red solid;
}

#output{
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 80vh;
}
</style>