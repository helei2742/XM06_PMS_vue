<template>
<!--
  任务提交记录
-->
<div class="submit-record">
  <show-window key="submitRecord"
               v-loading="loading"
               element-loading-text="查询提交记录中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">

    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>任务管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>任务提交记录</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{taskName}}</span>
    </div>

    <div slot="main">
      <div style="text-align: right;margin-right: 50px">
        <el-dropdown >
          <span class="el-dropdown-link">
           <i style="font-size: 30px;cursor: pointer" class="el-icon-more-outline el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button size="mini"
                         @click="exportTaskSubmitRecord"
                         icon="el-icon-s-fold">
                导出excel文件
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>



      <submit-record-table :record-list="recordList"/>

      <div style="text-align: center">
        <el-pagination
            :small="isUseSmall"
            :pager-count="5"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="limit"
            layout="total,prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from '@/components/showwindow/ShowWindow'

import SubmitRecordTable from '@/views/taskcomponent/submitrecord/SubmitRecordTable'

import {exportTaskSubmitRecordNetwork, queryTaskRecordNetwork, queryTaskRecordOfUserNetwork} from "@/network/task";
import {convertRes2Blob} from "@/util/fileUtil";


export default {
  name: "SubmitRecord",
  components: {
    ShowWindow,
    SubmitRecordTable
  },
  data() {
    return {
      taskName: '',
      loading: false,
      recordList: [],
      currentPage: 1,
      limit: 15,
      total: 0,
      taskId: -1
    }
  },
  computed:{
    isUseSmall(){
      return this.$store.getters.getScreenSize.width < 765;
    }
  },
  methods:{
    handleCurrentChange(val){
      this.queryTaskRecordOfUser(val)
    },
    queryTaskRecord(taskId, page){
      this.loading = true
      queryTaskRecordNetwork(taskId, page, this.limit).then(data =>{
        if(data.code === 200){
          let pageInfo = data.result
          this.recordList = pageInfo.list
          this.total = pageInfo.total
        }else {
          this.$message.error('出错了，'+data.msg)
        }
      }).finally(()=>{
        this.loading = false
      })
    },
    exportTaskSubmitRecord(){
      exportTaskSubmitRecordNetwork(this.taskId).then(res=>{
        convertRes2Blob(res)
      })
    }
  },
  /**
   * 路由进入的方法，发送请求获取任务提交记录数据
   */
  activated() {
    let taskName = this.$route.query.taskName
    this.taskId = this.$route.query.taskId
    if(taskName !== this.taskName){
      this.queryTaskRecord(this.taskId, 1)
    }
  }
}
</script>

<style scoped>

</style>