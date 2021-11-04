<template>
<div class="submit-task">
  <ShowWindow>
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
            :submit-url="submitUrl"
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

export default {
  name: "SubmitTask",
  components: {
    ShowWindow,
    SubmitTaskFrom
  },
  data() {
    return {
      task: null,
      submitUrl: 'http://localhost:9000/pms/task/submitTask'
    }
  },
  mounted() {
    this.task = this.$route.query.task
    if(this.$route.query.task === undefined) {
      this.$router.push('index/welcome')
    }
    console.log(this.task)
  }
}
</script>

<style scoped>

</style>