<template>
<div class="project-detail" v-if="project!=null">

  <show-window key="projectDetail">

    <div slot="title">
      <i class="el-icon-s-finance"></i>
      <span>项目管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>项目详情</span>
      <span v-if="project!=null" style="font-weight: bold">
        <i class="el-icon-arrow-right"></i>
        <span>{{project.projectName}}</span>
      </span>
    </div>

    <div slot="main" style="padding-bottom: 100px;text-align: center">

      <project-detail-card :project="project"/>

      <hr/>
      <el-link @click="queryProjectRecord">点击查看该项目的提交记录</el-link>
      <hr/>

      <project-update-record
          v-if="isShowUpdateRecord"
          v-loading="loading"
          element-loading-text="加载数据中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"

          @loadMoreRecord="loadMoreRecord"
          @downloadSubmit="downloadFile"
          :is-show-load-more="isHaveMore"
          :record-list="recordList"/>
    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import ProjectDetailCard from "@/views/projectcomponent/child/ProjectDetailCard";

import {downloadFileNetwork} from "@/network/file";
import {convertRes2Blob} from "@/util/fileUtil";

import {pageQueryProjectUpdateRecordNetwork, queryProjectByIdNetwork} from "@/network/project"
import ProjectUpdateRecord from "@/views/projectcomponent/child/projectupdaterecord/ProjectUpdateRecord";

export default {
  name: "ProjectDetail",
  components: {
    ProjectUpdateRecord,
    ShowWindow,
    ProjectDetailCard
  },
  computed: {
    isHaveMore() {
      if(this.recordList.length > 0){
        return this.haveNextPage
      }else{
        return false
      }
    }
  },
  data() {
    return {
      project: {},
      currentPage: 1,
      limit: 5,
      recordList: [],
      haveNextPage: false,
      isShowUpdateRecord: false,
      loading: false
    }
  },
  methods: {

    /**
     * 查询项目记录
     */
    queryProjectRecord() {
      this.isShowUpdateRecord = true
      let projectId = this.project.id
      this.loading = true

      pageQueryProjectUpdateRecordNetwork(projectId,
          this.currentPage, this.limit).then(data=>{

            if(data.code === 200) {
              let pageInfo = data.result
              this.haveNextPage = pageInfo.hasNextPage
              this.recordList.push(...pageInfo.list)

            }else {
              this.$message.error('出错了，' + data.msg)
            }
      }).finally(()=>{
        this.loading = false
      })
    },
    loadMoreRecord(){
      if(this.haveNextPage) {
        this.currentPage++
        this.queryProjectRecord()
      }
    },
    /**
     * 下载文件， src为服务器资源路径
     * @param src
     */
    downloadFile(src) {
      if(src === null || src === ''){
        this.$alert('资源路径不能为空')
        return
      }
      downloadFileNetwork(src).then( response =>{
        convertRes2Blob(response)
      })
    }
  },
  activated() {

    //进入时，如果没有project， 进行网络请求获取
    let project = this.$route.query.project
    if(project.id === undefined){
      let projectId = this.$route.query.projectId
      queryProjectByIdNetwork(projectId).then(data => {
        if(data.code === 200) {
          this.project = data.result
        }else {
          this.$message.error('加载失败，请稍后重试')
        }
      })

    }else {
      //进入不同的项目详情时，清除之前的状态
      if(project.id !== this.project.id){
        this.recordList = []
        this.isShowUpdateRecord = false
        this.haveNextPage = false
      }
      this.project = project
    }
  }
}
</script>

<style scoped>

</style>