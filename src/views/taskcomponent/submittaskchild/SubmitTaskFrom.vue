<template>

<div class="submit-task-from" v-if="task!=null">

  <el-descriptions :colon="false"
                   title="提交任务"
                   :column="1" >
    <el-descriptions-item  label="任务名称">{{task.taskName}}</el-descriptions-item>
    <el-descriptions-item label="任务要求"
                          :contentStyle="{'width':'60%'}"
    >
      <el-input type="textarea" :value="task.description"
                resize="none" autosize :readonly="true">
      </el-input>
    </el-descriptions-item>
  </el-descriptions>

  <el-input
      type="textarea"
      placeholder="请输入提交的内容或提交文件的描述"
      v-model="description"
      :autosize="{minRows: 3}">
  </el-input>
  <el-upload
      class="upload"
      drag
      ref="upload"
      action="/"
      :auto-upload="true"
      :http-request="addUploadFile"
      :on-remove="onRemove"
      :limit="1">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">支持上传单个文件，最大100MB。更换上传文件时请先点击删除之前选择的文件</div>
  </el-upload>

  <el-button style="margin-left: 10px;" size="small"
             type="success" @click="submitUpload">
    上传到服务器
  </el-button>

<!-- 上传进度条 -->
  <el-progress
                style="margin-top: 20px"
                v-if="percentVisible"
               :text-inside="true"
               :stroke-width="26"
               :percentage="progressPercent"
               status="success">
  </el-progress>
</div>
</template>

<script>
import {submitTaskFileNetwork} from "@/network/file"

export default {
  name: "SubmitTaskFrom",
  props: {
    task: {
      type: Object,
      default(){
        return null
      }
    }
  },
  data() {
    return {
      description: '',
      userId: this.$store.getters.getLoginUser.id,
      fileForm: null,
      progressPercent: 0,
      percentVisible: false
    }
  },
  methods:{
    addUploadFile(param) {
      this.fileForm = new FormData()
      this.fileForm.append('file', param.file)
    },
    onRemove(){
      this.percentVisible = false
    },
    submitUpload(){
      if(this.fileForm != null){
        this.percentVisible = true
      }
      const uploadProgressEvent = progressEvent => {
        this.progressPercent = (progressEvent.loaded / progressEvent.total * 100 | 0)
      }
      submitTaskFileNetwork(this.userId, this.task.id,
          this.description, this.fileForm,uploadProgressEvent).then(data =>{
        console.log(data)
        if(data.code === 200){
          this.$message.success('提交成功')
        }else {
          this.$message.error('提交失败，', data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.submit-task-from{
  background-color: transparent;
}
</style>