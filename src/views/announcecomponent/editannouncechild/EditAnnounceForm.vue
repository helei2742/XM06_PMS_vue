<template>
<div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="公告标题" prop="title">
      <el-input v-model="ruleForm.title"
                style="width: 70%"
                :disabled="!isEdit.title">
      </el-input>
      <el-button @click="isEdit.title=!isEdit.title" type="danger" icon="el-icon-edit"/>
    </el-form-item>

    <el-form-item label="公告内容" prop="mainBody">
      <el-input type="textarea"
                style="width: 70%"
                :show-word-limit="true"
                :rows="20"
                :disabled="!isEdit.mainBody"
                :minlength="1"
                :maxlength="7000"
                v-model="ruleForm.mainBody">
      </el-input>
      <el-button @click="isEdit.mainBody=!isEdit.mainBody" type="danger" icon="el-icon-edit"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="isSame" @click="submitForm('ruleForm')">立即修改</el-button>
      <el-button type="danger"
                 v-if="announce.userId === this.$store.getters.getLoginUser.id"
                 @click="deleteAnnounce">删除公告</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "EditAnnounceForm",
  props:{
    announce:{
      type: Object,
      default(){
        return null
      }
    }
  },
  computed:{
    isSame(){
      if(this.announce==null || this.ruleForm ==null)
        return false
      if(this.announce.title !== this.ruleForm.title)
        return false
      if(this.announce.mainBody !== this.ruleForm.mainBody)
        return false
      return true
    }
  },
  data(){
    return {
      ruleForm:{ //修改的
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
      },
      isEdit:{
        title: false,
        mainBody: false
      }
    }
  },
  methods:{
    reset(announce){
      this.ruleForm = JSON.parse(JSON.stringify(announce))
    },

    submitForm(refName){
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.ruleForm.mainBody = 'mainbody:'+ this.ruleForm.mainBody
          this.$emit('alterAnnounce', this.ruleForm)
        } else {
          return false;
        }
      });
    },
    deleteAnnounce(){
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('deleteAnnounce',this.announce.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>