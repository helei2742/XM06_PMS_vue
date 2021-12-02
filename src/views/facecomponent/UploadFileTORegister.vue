<template>
<div>
  <show-window>
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>人脸信息管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>视频上传人脸信息</span>
    </div>
    <div slot="main" style="padding: 10px 20px; height: 65vh">
      <el-upload
          class="upload-demo"
          ref="upload"
          action="/"
          :limit="1"
          :http-request="addUploadFile"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="true">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传.mp4文件，且不超过10mb</div>
      </el-upload>

      <el-progress
          style="margin-top: 20px"
          v-if="percentVisible"
          :text-inside="true"
          :stroke-width="26"
          :percentage="progressPercent"
          status="success">
      </el-progress>

      <el-button v-if="percentVisible" @click="trainFaceInfo">生成人脸信息</el-button>
    </div>

  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import {trainFaceInfoNetWork, uploadFaceMp4NetWork} from "@/network/face";

export default {
  name: "UploadFileTORegister",
  data(){
    return {
      isHaveFile: false,
      fileList: [],
      fileForm: null,
      percentVisible: false,
      progressPercent: 0,
      mp4SavePath: ''
    }
  },
  components: {ShowWindow},
  methods: {
    addUploadFile(param) {
      if('video/mp4' !== param.file.type){
        this.$alert('请选择mp4类型文件')
        this.$refs.upload.clearFiles()
        return
      }
      this.isHaveFile = true
      this.fileForm = new FormData()
      this.fileForm.append('file', param.file)
    },
    submitUpload(){
      if(this.fileForm == null||!this.isHaveFile){
        this.$message.error('请先选择文件')
        return
      }
      this.percentVisible = true
      const uploadProgressEvent = progressEvent => {
        this.progressPercent = (progressEvent.loaded / progressEvent.total * 100 | 0)
      }
      let userId  = this.$store.getters.getLoginUser.id

      uploadFaceMp4NetWork(userId,this.fileForm, uploadProgressEvent).then(data =>{
        console.log(data)
        if(data.code === 200){
          this.$alert('上传保存成功，请点击下方生成按钮，生成您的人类信息')
          this.mp4SavePath = data.result
        }else {
          this.$message.error('出错了', data.msg)
        }
      })
    },
    trainFaceInfo(){
      let userId  = this.$store.getters.getLoginUser.id
      let savePath = this.mp4SavePath
      if(savePath == null || savePath === ""){
        this.$alert('请先上传文件')
        return
      }

      const loading = this.$loading({
        lock: true,
        text: '正在解析视频分析人脸信息',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      trainFaceInfoNetWork(userId, savePath).then(data=>{
        console.log(data)
        if(data.code === 200){
          this.$message.success('人脸信息生成成功')
          loading.close()
        }else {
          this.$alert('生成失败,'+data.msg)
          loading.close()
        }
      }).catch(e => {
        this.$alert('出错啦,请稍后重试,或更换上传视频')
        loading.close()
      })

    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.isHaveFile = false
      this.percentVisible = false
    }
  }
}
</script>

<style scoped>

.upload-demo{
  position: relative;
  width: 320px;
  margin: 0 auto;
}
</style>