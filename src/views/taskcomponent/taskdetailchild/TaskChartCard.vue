<template>
<div class="task-chart-card"
     :style="$store.getters.getCardColorStyle">

  <div style="display: flex;justify-content: space-around;flex-wrap: wrap;margin-top: 20px">
    <div>
      <task-submit-chart ref="taskSubmitChart"/>
    </div>

    <div class="task-submit-list">
      <button @click="changeCurrentType">
        <i class="el-icon-refresh-left"></i>
      </button>

      <el-carousel ref="slideShow"
                   height="400px"
                   indicator-position="none"
                   direction="vertical"
                   :autoplay="false">
        <el-carousel-item>
          <div class="task-submit-list-title">已提交的用户</div>
          <el-table
              :row-style="this.$store.getters.getCardColorStyle"
              :header-cell-style="this.$store.getters.getCardColorStyle"
              :data="submitUsers"
              style="width: 100%"
              :height="'100%'"
              :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
                prop="trueName"
                label="姓名"
                sortable
                width="100">
            </el-table-column>
            <el-table-column
                prop="userName"
                label="真实姓名"
                width="131">
            </el-table-column>
            <el-table-column
                prop="updateDate"
                label="提交日期"
                sortable>
              <template slot-scope="scope">
                {{formatDate(scope.row.createDate)}}
              </template>
            </el-table-column>
          </el-table>
        </el-carousel-item>

        <el-carousel-item>
          <div class="task-submit-list-title">未提交的用户</div>
          <el-table
              :row-style="this.$store.getters.getCardColorStyle"
              :header-cell-style="this.$store.getters.getCardColorStyle"
              :data="notSubmitUsers"
              style="width: 100%"
              :height="'100%'"
              :default-sort = "{prop: 'date', order: 'descending'}"
          >

            <el-table-column
                prop="trueName"
                label="姓名"
                sortable
                width="100">
            </el-table-column>
            <el-table-column
                prop="userName"
                label="真实姓名"
                width="131">
            </el-table-column>
            <el-table-column
                prop="updateDate"
                label="提交日期"
                sortable>
              <template slot-scope="scope">
                {{formatDate(scope.row.createDate)}}
              </template>
            </el-table-column>
          </el-table>
        </el-carousel-item>
      </el-carousel>

    </div>
  </div>

  <div style="margin-top: 25px">
    <task-submit-sort-chart ref="taskSubmitSortChart"/>
  </div>
</div>
</template>

<script>
import TaskSubmitChart from "@/views/taskcomponent/taskdetailchild/TaskSubmitChart";
import TaskSubmitSortChart from "@/views/taskcomponent/taskdetailchild/TaskSubmitSortChart";
import {queryTaskSubmitChartsNetwork} from "@/network/task";
export default {
  name: "TaskChartCard",
  components: {TaskSubmitSortChart, TaskSubmitChart},
  props: {
    taskId:{
      type: Number,
      default: 0
    }
  },
  computed:{
    noMore() {
      return this.currentPage >= this.totalPage
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  data () {
    return {
      loading: false,
      sortLimit: 10,
      submitUsers: [],
      notSubmitUsers: []
    }
  },
  methods: {
    formatDate(time) {
      return this.$formatDate(time)
    },
    changeCurrentType(){
      this.$refs.slideShow.next()
    },
    initChart(taskId){
      queryTaskSubmitChartsNetwork(taskId).then(data=>{
        if(data.code === 200){
          let submit = data.submitUsers
          let notSubmit = data.submitUsers
          this.submitUsers = JSON.parse(JSON.stringify(submit))
          this.notSubmitUsers = JSON.parse(JSON.stringify(notSubmit))
          submit.sort((u1,u2)=>{
            return u1.updateDate - u2.updateDate
          })
          let count = 0
          let names = []
          let dates = []
          for (let user of submit) {
            names.push(user.userName)
            let day = (new Date().getTime() - user.updateDate)/1000/60/60
            dates.push(day)
            if(++count>=10) break
          }

          this.$refs.taskSubmitChart.loadChart(data.max, submit.length)
          this.$refs.taskSubmitSortChart.loadChart(names, dates)
        }else {
          this.$message.error('出错了'+data.msg)
        }
      })
    }
  }

}
</script>

<style scoped>
.task-chart-card{
  position: relative;
  width: 100%;
  margin-left: 10px;
  border-radius: 12px;
  min-height: 400px;
  border: 1px solid rgba(100,100,100,0.3);
}

.task-submit-list{
  width: 50%;
  min-width: 300px;
  height: 400px;
  position: relative;
  margin-top: 20px;
  border-radius: 13px;
  border: 1px solid rgba(100,100,100,0.7);
  box-shadow: 8px 8px 2px 1px rgba(100,100,100,0.4);
}

.task-submit-list>button{
  float: left;
  position: absolute;
  padding: 1px;
  right: 15px;
  font-size: 32px;
  z-index: 100;
  border: none;
  background-color: transparent;
}
.task-submit-list>button:hover{
  cursor: pointer;
  color: #45c436;
}
.task-submit-list>button:focus{
  color: #17f9ee;
}
.task-submit-list .task-submit-list-title{
  font-size: 17px;
  font-weight: 800;
  height: 25px;
  line-height: 25px;
  text-align: center;
}
</style>