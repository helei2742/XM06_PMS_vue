<template>
<div class="show-task-desc">
  <el-descriptions title="任务详情" :column="1" >
    <template slot="extra">
      <el-button type="success" icon="el-icon-document-add"
                 @click="submitTask(task)" size="small">提交任务</el-button>

      <el-button type="primary" icon="el-icon-document-add"
                 @click="submitRecord(task)" size="small">提交记录</el-button>
    </template>
    <el-descriptions-item label="任务名称">{{task.taskName}}</el-descriptions-item>
    <el-descriptions-item label="任务要求"
      :contentStyle="{'width':'60%'}"
    >
      <el-input type="textarea" :value="task.description"
                resize="none" autosize :readonly="true">
      </el-input>
    </el-descriptions-item>
    <el-descriptions-item label="发布日期">
      <el-tag type="info">{{formatDate(task.createDate)}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="截止日期">
      <el-tag  :type="getType">{{formatDate(task.deadline)+""+dateState}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="发布人用户名">
      {{task.creator.userName}}
    </el-descriptions-item>
    <el-descriptions-item label="发布人真实姓名">
      {{task.creator.trueName}}
    </el-descriptions-item>
    <el-descriptions-item label="发布人邮箱">
      {{task.creator.email}}
    </el-descriptions-item>

  </el-descriptions>

</div>

</template>

<script>
export default {
  name: "ShowTaskDesc",
  props:{
    task: {
      type: Object,
      default() {
        return null
      }
    }
  },
  computed: {
    formatDate(){
      return (num)=>{
        return this.$formatDate(num)
      }
    },
    getType(){
      if(this.task.deadline - new Date().getTime() < 0){
        return 'danger'
      }
      else if(this.task.deadline - new Date().getTime() < 24*60*60*1000){
        return 'warning'
      }
      else return 'success'
    },
    dateState(){
      if(this.task.deadline - new Date().getTime() < 0){
        return '(已过期)'
      }
      else if(this.task.deadline - new Date().getTime() < 24*60*60*1000){
        return '(不足一天)'
      }
      else return ''
    }
  },
  methods:{
    submitTask(task){
      if(task.deadline - new Date().getTime() < 0){
        this.$message.error('任务已过期，不能提交')
        return
      }

      this.$emit('submittask', task)
    },
    submitRecord(task){
      this.$emit('submitrecord', task)
    }
  }
}
</script>

<style scoped>
.show-task-desc{
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 10px;
  margin-top: 20px;
}

</style>