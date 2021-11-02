<template>
<div class="show-task">
  <show-window>
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>任务管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>查看任务</span>
    </div>

    <div slot="main">
      <div>
        <el-button type="primary" @click="typeChange(1)" size="mini">全部任务</el-button>
        <el-button type="primary" @click="typeChange(2)" size="mini">我发布的任务</el-button>
        <el-button type="primary" @click="typeChange(3)" size="mini">正在进行的任务</el-button>
        <el-button type="primary" @click="typeChange(4)" size="mini">已提交的任务</el-button>
        <el-button type="primary" @click="typeChange(7)" size="mini">未提交的任务</el-button>
        <el-button type="primary" @click="typeChange(5)" size="mini">过期的任务</el-button>
        <el-select style="margin-left: 10px" size="mini"
                   v-model="queryGroup" placeholder="根据小组查询">
          <el-option v-for="group in userGroups"
                     :key="group.groupName"
                     :label="group.groupName"
                     :value="group.id">
          </el-option>
        </el-select>
        <el-button type="primary" @click="typeChange(6)" size="mini">查询</el-button>
      </div>

      <el-row>
        <el-col :offset="1" :xs="22" :sm="18" :md="18" :lg="18" :xl="15">
          <show-task-desc v-for="task in tasks"
                          :task="task"
                          @submittask="submitTask"
                          @submitrecord="submitRecord"
                         />
        </el-col>
      </el-row>

      <el-pagination
          ref="pag"
          class="pagination"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="limit"
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


export default {
  name: "ShowTask",
  components:{
    ShowWindow,
    ShowTaskDesc
  },
  data() {
    return {
      page: 1,
      limit: 4,
      tasks: [],
      total: 0,
      creator: null,
      queryType: 1,// 1代表全部，2代表我发布的，3代表正在进行的，4代表过期的，5代表已提交的
      userGroups: [],
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
    let userId = this.$store.getters.getLoginUser.id
    queryJoinedGroupAllNetwork(userId).then(data=>{
      if(data.code === 200){
        this.userGroups = data.result
        console.log(this.userGroups)
      }else {
        this.$message.error('出错了，'+data.msg)
      }
    })
  }
}
</script>

<style scoped>

</style>