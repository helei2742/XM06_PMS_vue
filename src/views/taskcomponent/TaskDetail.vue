<template>
<div class="task-detail" v-if="task !== null">
  <show-window v-loading="loading"
               element-loading-text="查询任务信息中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>任务管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>任务详情</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{task.taskName}}</span>
    </div>

    <div slot="main">
      <div style="text-align: right;margin-right: 25px">
        <el-dropdown >
          <span class="el-dropdown-link">
           <i style="font-size: 30px;cursor: pointer" class="el-icon-more-outline el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="success"
                         icon="el-icon-upload2"
                         @click="submitTask(task)"
                         size="small">
                提交任务
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="primary"
                         icon="el-icon-s-claim"
                         @click="submitRecord(task)"
                         size="small">
                提交记录
              </el-button>
            </el-dropdown-item>

            <el-dropdown-item v-if="task.creatorId === this.$store.getters.getLoginUser.id">
              <el-button type="warning"
                         @click="alterTask(task)"
                         icon="el-icon-edit"
                         size="small">
                修改任务
              </el-button>
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </div>


      <el-row :gutter="1">
        <el-col :xs="22" :sm="22" :md="22" :lg="6" :xl="6">
            <task-detail-base-info-card :task="task"/>
        </el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="16" :xl="16">
          <task-chart-card ref="taskChartCard"
                           :task-id="task.id"/>
        </el-col>
      </el-row>
    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import {queryTaskInfoNetwork} from "@/network/task";
import TaskDetailBaseInfoCard from "@/views/taskcomponent/taskdetailchild/TaskDetailBaseInfoCard";
import {queryUserByIdNetwork} from "@/network/user";
import TaskSubmitChart from "@/views/taskcomponent/taskdetailchild/TaskSubmitChart";
import TaskChartCard from "@/views/taskcomponent/taskdetailchild/TaskChartCard";

export default {
  name: "TaskDetail",
  components: {TaskChartCard, TaskSubmitChart, TaskDetailBaseInfoCard, ShowWindow},
  data(){
    return {
      task: null,
      loading: false
    }
  },
  methods:{

    submitTask(task){
      this.$router.push({
        path:'/index/submittask',
        query: {
          task,
          taskId: task.id
        }
      })
    },
    submitRecord(task){
      this.$router.push({
        path: '/index/submitrecord',
        query:{
          taskName: task.taskName,
          taskId: task.id
        }
      })
    },
    alterTask(task) {
      this.$router.push({
        path: '/index/altertask',
        query:{
          task: task,
          taskId: task.id
        }
      })
    }
  },
  activated() {
    let task = this.$route.query.task
    let taskId = this.$route.query.taskId
    if(task.id===undefined){
      this.loading = true
      queryTaskInfoNetwork(taskId).then(data=>{
        if(data.code === 200){
          this.task = data.result
          this.$nextTick(() => {
            this.$refs.taskChartCard.initChart(taskId)
          })
        }else {
          this.$message.error('查询任务信息失败,'+data.msg)
        }
      }).finally(()=>{
        this.loading = false
      })

    }else{
      this.task = task
      this.$nextTick(() => {
        this.$refs.taskChartCard.initChart(taskId)
      })
    }
  }
}
</script>

<style scoped>

</style>