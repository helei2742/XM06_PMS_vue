<template>
<div class="my-submit-record" >
  <show-window key="submitRecord"
               v-loading="loading"
               element-loading-text="查询提交记录中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>任务管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>我的提交记录</span>
    </div>
    <div slot="main">

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
import ShowWindow from "@/components/showwindow/ShowWindow";
import SubmitRecordTable from "@/views/taskcomponent/submitrecord/SubmitRecordTable";
import {queryTaskRecordOfUserNetwork} from "@/network/task";

export default {
  name: "MySubmitRecord",
  components: {SubmitRecordTable, ShowWindow},
  data(){
    return {
      loading: false,
      recordList: [],
      currentPage: 1,
      limit: 15,
      total: 0
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
    queryTaskRecordOfUser(page){
      let userId = this.$store.getters.getLoginUser.id
      this.loading = true
      queryTaskRecordOfUserNetwork(userId, page, this.limit).then(data =>{
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
    }
  },
  mounted() {
    this.queryTaskRecordOfUser(1)
  }
}
</script>

<style scoped>

</style>