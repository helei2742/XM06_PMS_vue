<template>
<div class="show-task">
  <show-window key="showTask">
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>任务管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>查看任务</span>
    </div>

    <div slot="main">

      <el-row class="task-select">
        <el-button type="primary" @click="typeChange(1)" size="mini">全部任务</el-button>
        <el-button type="primary" @click="typeChange(2)" size="mini">我发布的任务</el-button>
        <el-button type="primary" @click="typeChange(3)" size="mini">正在进行的任务</el-button>
        <el-button type="primary" @click="typeChange(4)" size="mini">已提交的任务</el-button>
        <el-button type="primary" @click="typeChange(7)" size="mini">未提交的任务</el-button>
        <el-button type="primary" @click="typeChange(5)" size="mini">过期的任务</el-button>

        <el-select style="margin-left: 10px" size="mini"
                   v-model="queryGroup" placeholder="根据小组查询">
          <el-option v-for="group in this.$store.getters.getJoinedGroup"
                     :key="group.groupName"
                     :label="group.groupName"
                     :value="group.id">
          </el-option>
        </el-select>
        <el-button type="primary" @click="typeChange(6)" size="mini">查询</el-button>
      </el-row>

      <el-row class="task-list-area">
        <el-col :offset="1" :xs="22" :sm="18" :md="18" :lg="18" :xl="15">
          <show-task-desc v-for="task in tasks"
                          :task="task"
                          :card-style="getShowTaskCardStyle"
                          @submittask="submitTask"
                          @submitrecord="submitRecord"
                         />
        </el-col>
      </el-row>

      <el-pagination
          style="margin-top: 10px;text-align: center"
          ref="pag"
          class="pagination"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="limit"
          :pager-count="7"
          layout="total, prev, pager, next, jumper"
          :total="total">
      </el-pagination>


    </div>

  </show-window>
</div>
</template>

<script>
import ShowTaskDesc from '@/views/taskcomponent/child/ShowTaskDesc'
import ShowWindow from "@/components/showwindow/ShowWindow";

import {queryJoinedGroupAllNetwork} from "@/network/group";
import {pageQueryUserTaskNetwork} from "@/network/task";
import {RELOADJOINEDGROUP} from "@/store/mutations-types-groupmodule";


export default {
  name: "ShowTask",
  components:{
    ShowWindow,
    ShowTaskDesc
  },
  computed: {
    getShowTaskCardStyle() {
      return this.$store.getters.getCardColorStyle
    }
  },
  data() {
    return {
      page: 1,
      limit: 4,
      tasks: [],
      total: 0,
      creator: null,
      queryType: 1,// 1代表全部，2代表我发布的，3代表正在进行的，4代表过期的，5代表已提交的
      queryGroup: null
    }
  },
  methods: {
    pageQueryUserTask(page, limit){
      console.log(this.queryGroup)
      let userId = this.$store.getters.getLoginUser.id
      pageQueryUserTaskNetwork(userId, page, limit, this.queryType, this.queryGroup).then(data=>{
        console.log(data)
        let pageInfo = data.result
        if(data.code === 200){
          this.tasks = pageInfo.list
          this.total = pageInfo.total
        }else {
          this.$message.error('出错了,'+data.msg)
        }
      })
    },
    handleCurrentChange(index){
      this.pageQueryUserTask(index, this.limit)
    },
    //根据类型查找发布的任务，
    typeChange(type){
      if(type === this.queryType && type !== 6) return
      if(type === 6 && this.queryGroup === null){
        this.$alert('请选择小组')
        return
      }
      this.queryType = type
      this.page = 1
      this.handleCurrentChange(this.page)
    },

    submitTask(task){
      this.$router.push({
        path:'/index/submittask',
        query: {
          task
        }
      })
    },
    submitRecord(task){
      this.$router.push({
        path: '/index/submitrecord',
        query:{
          task
        }
      })
    }
  },
  mounted() {
    this.pageQueryUserTask(this.page, this.limit)
    this.$store.dispatch(RELOADJOINEDGROUP)
  }
}
</script>

<style scoped>
.task-select{

  left: 20px;
  top: 30px;
}
.task-list-area{
  margin-top: 30px;
}
</style>