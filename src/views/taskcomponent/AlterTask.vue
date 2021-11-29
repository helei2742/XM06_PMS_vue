<template>
<div class="alter-task">
  <show-window v-loading="loading"
               element-loading-text="查询任务信息中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">

    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>任务管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>修改任务信息</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{task.taskName}}</span>
    </div>

    <div slot="main">

      <el-row>
        <el-col :offset="2" :xs="22" :sm="18" :md="18" :lg="10" :xl="10">
          <alter-task-form
              ref="alterTaskForm"
              @alterTask="alterTask"
              :task="task"/>
        </el-col>
      </el-row>

    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import {alterTaskNetWork, queryTaskInfoNetwork} from "@/network/task";
import AlterTaskForm from "@/views/taskcomponent/altertaskchild/AlterTaskForm";
export default {
  name: "AlterTask",
  components: {AlterTaskForm, ShowWindow},
  data(){
    return  {
      task: {},
      loading: false
    }
  },
  methods:{
    alterTask(task){

      alterTaskNetWork(task).then(data=>{
        if(data.code === 200){
          this.$message.success('修改任务信息成功')
        }else {
          this.$message.error('修改失败，请稍后重试')
        }
      })
    }
  },
  activated() {
    this.$refs.alterTaskForm.reset()

    let task = this.$route.query.task
    let taskId = this.$route.query.taskId


    if(task.id === undefined){
      this.loading = true
      queryTaskInfoNetwork(taskId).then((data)=>{
        if(data.code === 200){
          this.task = data.result
          this.$refs.alterTaskForm.setTaskForm(this.task)
        }else{
          this.$message.error('出错拉，获取任务信息失败')
        }
      }).finally(()=>{
        this.loading = false
      })
    }else{
      this.task = task
      this.$refs.alterTaskForm.setTaskForm(this.task)
    }
  }
}
</script>

<style scoped>

</style>