<template>
<div class="project-file-upload-model">
  <el-upload
      class="upload-demo"
      action="/"
      :http-request="addUploadFile"
      :limit="1"
      :auto-upload="true"
      :file-list="fileList">
    <el-button size="small" type="primary">点击选择附件</el-button>
    <div slot="tip" class="el-upload__tip">每次请上传一个文件，不超过100MB</div>
  </el-upload>

</div>
</template>

<script>
export default {
  name: "FileUploadModel",
  data() {
    return {
      fileList: [],
      fileForm: null
    }
  },
  methods: {
    addUploadFile(param) {
      this.fileForm = new FormData()
      this.fileForm.append('file', param.file)
    }
  }
}
</script>

<style scoped>

</style>