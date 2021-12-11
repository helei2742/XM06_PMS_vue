<template>
<div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="任务名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="所属小组" prop="group">

      <el-select v-model="ruleForm.groupId"
                 placeholder="请选择所属小组">
        <el-option v-for="group in userGroups"
                   :key="group.groupName"
                   :label="group.groupName"
                   :value="group.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="截止时间" required>
        <el-form-item prop="date">
            <el-date-picker
                style="width: 100%"
                v-model="ruleForm.date"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00">
            </el-date-picker>
        </el-form-item>
    </el-form-item>

    <el-form-item label="任务描述" prop="desc">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 9 }" v-model="ruleForm.desc"></el-input>
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
  name: "CreateTaskFrom",
  props: {
    userGroups: null
  },
  data() {
    return {
      ruleForm: {
        name: '',
        groupId: '',
        date: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
        ],
        groupId: [
          { required: true, message: '请选择所属小组', trigger: 'change' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写任务描述', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.date = new Date(this.ruleForm.date).getTime()
          this.ruleForm.creatorId = this.$store.getters.getLoginUser.id
          console.log(this.ruleForm)
          this.$emit('createtask', this.ruleForm)
        } else {
          console.log('error submit!!');
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

</style>