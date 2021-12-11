<template>
<div class="alter-task-form">
  <el-form ref="ruleForm"
           :model="taskForm"
           :rules="rules"
           label-width="80px"
           size="mini">

    <el-form-item label="任务名称" prop="taskName">
      <el-input v-model="taskForm.taskName"
                style="width: 70%"
                :disabled="!isAlterName">
      </el-input>
      <el-button @click="isAlterName=!isAlterName" type="danger" icon="el-icon-edit"/>

    </el-form-item>

    <el-form-item label="任务描述" size="description">
      <el-input type="textarea"
                style="width: 70%"
                :disabled="!isAlterDescription"
                :autosize="{ minRows: 2, maxRows: 9 }"
                v-model="taskForm.description">
      </el-input>
      <el-button @click="isAlterDescription=!isAlterDescription" type="danger" icon="el-icon-edit"/>
    </el-form-item>

    <el-form-item label="截止时间" prop="deadline">
      <el-date-picker
          style="width: 70%"
          :disabled="!isAlterDeadline"
          v-model="taskForm.deadline"
          type="datetime"
          placeholder="选择日期时间">
      </el-date-picker>
      <el-button @click="isAlterDeadline=!isAlterDeadline" type="danger" icon="el-icon-edit"/>
    </el-form-item>

    <el-form-item size="large">
      <el-button type="warning"
                 :disabled="isNotChange"
                 @click="submitForm('ruleForm')">确认修改</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>


export default {
  name: "AlterTaskForm",
  props:{
    task: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    isNotChange(){
      return this.taskForm.taskName===this.task.taskName
          && this.taskForm.deadline===this.task.deadline
          && this.taskForm.description===this.task.description
    }
  },
  data(){
    return {
      taskForm: {},
      isAlterName: false,
      isAlterDeadline: false,
      isAlterDescription: false,
      rules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
        ],
        deadline: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写任务描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    setTaskForm(t){
      this.taskForm = JSON.parse(JSON.stringify(t))
    },
    reset(){
      this.taskForm = {}
      this.isAlterName = false
      this.isAlterDeadline = false
      this.isAlterDescription= false
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.taskForm)
          this.taskForm.deadline = new Date(this.taskForm.deadline).getTime()

          this.$emit('alterTask', this.taskForm)
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>
.alter-task-form{
  margin: 20% 0;
}
</style>