<template>
<div class="show-task">
  <show-window
      v-loading="loading"
      element-loading-text="等待网络中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      key="showTask">
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>任务管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>查看任务</span>
    </div>

    <div slot="main">

      <div class="task-select">
        <div>
          <el-button type="primary" @click="typeChange(1)" size="mini">全部任务</el-button>
        </div>
        <div>
          <el-button type="primary" @click="typeChange(2)" size="mini">我发布的任务</el-button>
        </div>
        <div>
          <el-button type="primary" @click="typeChange(3)" size="mini">正在进行的任务</el-button>
        </div>
        <div>
          <el-button type="primary" @click="typeChange(4)" size="mini">已提交的任务</el-button>
        </div>
        <div>
          <el-button type="primary" @click="typeChange(7)" size="mini">未提交的任务</el-button>
        </div>
        <div>
          <el-button type="primary" @click="typeChange(5)" size="mini">过期的任务</el-button>
        </div>

        <div>
          <el-select size="mini"
                     v-model="queryGroup" placeholder="根据小组查询">
            <!--    查询小组条件放到store中缓存-->
            <el-option v-for="group in this.$store.getters.getJoinedGroup"
                       :key="group.groupName"
                       :label="group.groupName"
                       :value="group.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="typeChange(6)" size="mini">查询</el-button>
        </div>
      </div>

      <el-row class="task-list-area">
        <el-col :offset="1" :xs="18" :sm="18" :md="18" :lg="18" :xl="15">
          <show-task-desc v-for="task in tasks"
                          :task="task"
                          :card-style="getShowTaskCardStyle"
                          @submittask="submitTask"
                          @submitrecord="submitRecord"
                          @altertask="alterTask"
                          @droptask="dropTask"
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
import ShowTaskDesc from '@/views/taskcomponent/showtaskchild/ShowTaskDesc'
import ShowWindow from "@/components/showwindow/ShowWindow";

import {queryJoinedGroupAllNetwork} from "@/network/group";
import {dropTaskNetwork, pageQueryUserTaskNetwork} from "@/network/task";
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
      limit: 6,
      tasks: [],
      total: 0,
      creator: null,
      queryType: 1,// 1代表全部，2代表我发布的，3代表正在进行的，4代表过期的，5代表已提交的
      queryGroup: null, //为小组id
      loading: false
    }
  },
  methods: {
    pageQueryUserTask(page, limit){
      let userId = this.$store.getters.getLoginUser.id
      this.loading = true
      pageQueryUserTaskNetwork(userId, page, limit, this.queryType, this.queryGroup).then(data=>{
        let pageInfo = data.result
        if(data.code === 200){
          this.tasks = pageInfo.list
          this.total = pageInfo.total
        }else {
          this.$message.error('出错了,'+data.msg)
        }
      }).finally(()=>{
        this.loading = false
      })

    },
    handleCurrentChange(index){
      this.pageQueryUserTask(index, this.limit)
    },
    //根据类型查找发布的任务，
    typeChange(type){
      //查询类型不变，直接返回， （查询类型为6 为按名称查询，不返回
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
    },
    dropTask(taskId){
      this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let userId = this.$store.getters.getLoginUser.id
        this.loading = true
        dropTaskNetwork(taskId, userId).then(data=>{
          if(data.code === 200){
            this.$message.success('删除成功')
          }else {
            this.$alert('删除失败，' + data.msg)
          }
        }).finally(()=>{
          this.loading = false
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted() {
    this.pageQueryUserTask(this.page, this.limit)
    //查询的小组条件从store中获取，刷新的时候重新加载
    this.$store.dispatch(RELOADJOINEDGROUP)
  }
}
</script>

<style scoped>
.task-select{
  padding: 5px 15px;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.task-select>div{
  margin: 10px 10px;
}

.task-list-area{
  margin-top: 30px;
}
</style>