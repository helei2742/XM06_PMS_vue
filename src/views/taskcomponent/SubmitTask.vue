<template>
<div class="submit-task">
  <ShowWindow key="submitTask">
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>任务管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>提交任务</span>
    </div>

    <div slot="main">
      <el-row>
        <el-col :offset="1" :xs="22" :sm="18" :md="14" :lg="10" :xl="10">
          <submit-task-from
            :task="task"/>
        </el-col>
      </el-row>
    </div>
  </ShowWindow>
</div>
</template>

<script>
import ShowWindow from '@/components/showwindow/ShowWindow'
import SubmitTaskFrom from "@/views/taskcomponent/child/SubmitTaskFrom";
import {queryTaskInfoNetwork} from "@/network/task";

export default {
  name: "SubmitTask",
  components: {
    ShowWindow,
    SubmitTaskFrom
  },
  data() {
    return {
      task: null
    }
  },
  mounted() {
    let task = this.$route.query.task
    let taskId = this.$route.query.taskId
    if(task.id === undefined) {
      queryTaskInfoNetwork(taskId).then(data=>{
        if(data.code === 200){
          this.task = data.result
        }else {
          this.$message.error('出错了，请稍后重试')
        }
      })
    }else {
      this.task = task
    }
  }
}
</script>

<style scoped>

</style>