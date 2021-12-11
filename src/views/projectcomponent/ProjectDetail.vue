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

      <div style="text-align: right;margin-right: 25px">
        <el-dropdown >
          <span class="el-dropdown-link">
           <i style="font-size: 30px;cursor: pointer" class="el-icon-more-outline el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="project.creatorId === this.$store.getters.getLoginUser.id">
              <el-button type="warning"
                         @click="alterProject(project)"
                         icon="el-icon-edit"
                         size="small">
                修改项目
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item v-if="project.creatorId === this.$store.getters.getLoginUser.id">
              <el-button type="danger"
                         @click="deleteProject(project)"
                         icon="el-icon-edit"
                         size="small">
                删除项目
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <project-detail-card :project="project" :creator="creator"/>

      <user-submit-degree-chart ref="userSubmitDegreeChart"/>

      <user-submit14-day-chart ref="userSubmit14dayChart"/>

      <hr/>
      <el-link v-if="!isClick" @click="queryProjectRecord">点击查看该项目的提交记录</el-link>
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
import UserSubmitDegreeChart from "@/views/projectcomponent/child/charts/UserSubmitDegreeChart";
import UserSubmit14DayChart from "@/views/projectcomponent/child/charts/UserSubmit14DayChart";
import {queryUserByIdNetwork} from "@/network/user";

export default {
  name: "ProjectDetail",
  components: {
    UserSubmit14DayChart,
    UserSubmitDegreeChart,
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
      isClick: false,
      isShowUpdateRecord: false,
      loading: false,
      creator: null
    }
  },
  methods: {

    /**
     * 查询项目提交记录
     */
    queryProjectRecord() {
      this.isShowUpdateRecord = true
      let projectId = this.project.id
      this.loading = true
      this.isClick = true

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
    },
    alterProject(project){
      this.$router.push({
        path: '/index/alterproject',
        query: {
          project: project,
          projectId: project.id
        }
      })
    },
    deleteProject(project){
      this.$alert('请到项目列表中找到该项目再选择删除')
    },
    loadData(project,projectId){
      return new Promise(((resolve, reject) => {
        if(project.id === undefined){

          queryProjectByIdNetwork(projectId).then(data => {
            if(data.code === 200) {
              this.project = data.result
              return queryUserByIdNetwork(data.result.creatorId)
            }else {
              this.$message.error('加载失败，请稍后重试')
            }
          }).then(data=>{
            this.creator = data.result
          }).catch(e=>{
            reject()
          }).finally(()=>{
            resolve()
          })
        }else {
          //进入不同的项目详情时，清除之前的状态
          if(project.id !== this.project.id){
            this.recordList = []
            this.isShowUpdateRecord = false
            this.haveNextPage = false
            this.isClick = false
          }
          this.project = project
          queryUserByIdNetwork(project.creatorId).then(data=>{
            this.creator = data.result
          }).catch(e => {
            reject(e)
          }).finally(()=>{
            resolve()
          })
        }
      }))
    }
  },
  activated() {

    //进入时，如果没有project， 进行网络请求获取
    let projectId = this.$route.query.projectId
    let project = this.$route.query.project

    this.loadData(project,projectId)

    //重新加载图表信息
    this.$refs.userSubmit14dayChart.loadChart(projectId)
    this.$refs.userSubmitDegreeChart.loadChart(projectId)

  }
}
</script>

<style scoped>

</style>