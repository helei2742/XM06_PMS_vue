<template>
<div class="face-info-register">

  <ShowWindow>
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>人脸信息管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>人脸信息录入</span>
    </div>

    <div slot="main" style="text-align: center; height: 65vh">
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



    <el-row type="flex" justify="center">
    <el-col :offset="1" :xs="26" :sm="18" :md="14" :lg="10" :xl="10">

      <face-connect v-if="!isFaceImgUploadSuccess"
                    :img-save-times="200"
                    @imgConnected="uploadFaces"
                    :need-img-count="100"/>

      <el-result v-else icon="success" title="生成成功" subTitle="点击返回到主页面">
        <template slot="extra">
          <el-button type="primary" @click="isStart = false" size="medium">返回</el-button>
        </template>
      </el-result>

    </el-col>
    </el-row>
  </el-dialog>

</div>
</template>

<script>
import ShowWindow from '@/components/showwindow/ShowWindow'
import {uploadFacesNetWork} from "@/network/face";
import FaceConnect from "@/components/faceconnect/FaceConnect";

export default {
  name: "FaceInfoRegister",
  components: {
    FaceConnect,
    ShowWindow
  },
  data(){
    return {
      isStart: false,
      isFaceImgUploadSuccess: false,
    }
  },
  methods: {

    /**
     * 点击关闭
     */
    handleClose(done) {
      this.$confirm('将取消人脸信息录入，确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    /**
     * 点击立即采集按钮调用
     */
    startFaceInfoReg() {
      this.isStart = true
    },
    uploadVideo(){
      this.$router.push('/index/facefileupload')
    },

    /**
     * 网络请求上传脸的base64码
     * @param faces
     */
    uploadFaces(faces){
      let uid = this.$store.getters.getLoginUser.id
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

        }else {
          this.$alert('人脸信息上传失败,' + data.msg)
        }
      }).catch(e=>{
        this.$message.error('出错了')
      }).finally(()=>{
        loading.close()
      })
    }
  }
}
</script>

<style scoped>

</style>