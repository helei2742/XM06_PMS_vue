<template>
<div class="create-announce-form">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="公告标题" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>

    <el-form-item label="公告内容" prop="mainBody">
      <el-input type="textarea"
                :show-word-limit="true"
                :rows="20"
                :minlength="1"
                :maxlength="7000"
                v-model="ruleForm.mainBody">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "CreateAnnounceForm",
  data() {
    return {
      ruleForm:{
        title: '',
        mainBody: '',
      },
      rules:{
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 50                                                                                                                                                        ' +
                ' 个字符', trigger: 'blur' }
        ],
        mainBody: [
          { required: true, message: '请输入公告内容', trigger: 'blur' },
        ]
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.mainBody = 'mainbody:'+ this.ruleForm.mainBody
          this.$emit('createAnnounce', this.ruleForm)
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.create-announce-form{
  padding: 20px;
}
</style>