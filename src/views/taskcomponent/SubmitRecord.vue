<template>

<!--
  任务提交记录
-->
<div class="submit-record" v-if="task!=null">
  <show-window>
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>任务管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>任务提交记录</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{task.taskName}}</span>
    </div>

    <div slot="main">
      <submit-record-table :record-list="recordList"/>
    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from '@/components/showwindow/ShowWindow'

import SubmitRecordTable from '@/views/taskcomponent/child/SubmitRecordTable'

import {queryTaskRecordNetwork} from "@/network/task";


export default {
  name: "SubmitRecord",
  components: {
    ShowWindow,
    SubmitRecordTable
  },
  data() {
    return {
      task: null,
      recordList: []
    }
  },
  /**
   * 路由进入的方法，发送请求获取任务提交记录数据
   */
  activated() {
    this.task = this.$route.query.task
    console.log(this.task)
    queryTaskRecordNetwork(this.task.id).then(data =>{
      if(data.code === 200){
        let pageInfo = data.result
        this.recordList = pageInfo.list
        console.log(this.recordList)
      }else {
        this.$message.error('出错了，'+data.msg)
      }
    })
  }
}
</script>

<style scoped>

</style>