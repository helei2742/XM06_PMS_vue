<template>
  <div class="project-list">
    <show-window >
      <div slot="title">
        <i class="el-icon-s-finance"></i>
        <span>项目管理</span>
        <i class="el-icon-arrow-right"></i>
        <span>项目列表</span>
      </div>

      <div slot="main">
        <!-- 选择按钮套件-->
        <el-row class="project-list-select">
          <el-button :type="this.queryType === 1?'success':'primary'"
                     @click="handleTypeChange(1)" size="mini">我创建的项目</el-button>
          <el-button :type="this.queryType === 2?'success':'primary'"
                     @click="handleTypeChange(2)" size="mini">我加入小组的项目</el-button>
          <el-button :type="this.queryType === 3?'success':'primary'"
                     @click="handleTypeChange(3)" size="mini">查看公开的项目</el-button>
          <div style="padding: 8px 0">
          <el-select v-model="orderType" placeholder="请选择" size="mini">
            <el-option label="创建时间降序" :value="1"/>
            <el-option label="创建时间升序" :value="2"/>
            <el-option label="完成度降序" :value="3"/>
            <el-option label="完成度升序" :value="4"/>
          </el-select>
          <el-button type="success" size="mini" @click="handleOrderType">排序</el-button>
          </div>
        </el-row>

        <!--项目展示区域-->
        <el-row class="project-list-area">
          <el-col :offset="1" :xs="22" :sm="18" :md="18" :lg="18" :xl="15">
            <div v-if="isShowPublicBtn" style="position: absolute; right: 20px;">
              <el-switch :offset="18"
                         v-model="isShowAll"
                         @change="handleIsShowAll"
                         active-text="所有项目"
                         inactive-text="私有项目">
              </el-switch>
            </div>

            <div v-if="projectList == null || projectList.length===0" style="width: 100%;height: 500px">
              <el-empty>
                <div slot="description">没有项目？改变筛选条件，或点击下方</div>
                <el-button type="info" size="mini" @click="toCreateProjectPage" round>创建项目</el-button>
              </el-empty>
            </div>

             <project-list-card :project-list="projectList"/>
          </el-col>
        </el-row>


        <!-- 分页条-->
        <el-row>
          <div class="block">
            <el-pagination
                style="margin-top: 10px;text-align: center"
                @current-change="handleCurrentChange"
                :current-page=currentPage
                :pager-count="7"
                :page-size="limit"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>
        </el-row>

      </div>
    </show-window>
  </div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import ProjectListCard from "@/views/projectcomponent/child/ProjectListCard";
import {queryProjectListNetwork} from "@/network/project.js"


export default {
  name: "ProjectList",
  components: {ProjectListCard, ShowWindow},
  data() {
    return {
      queryType: 0,
      orderType: 1,
      isShowAll: true,
      projectList: [],
      privateList: [],
      allList:[],
      currentPage: 1,
      limit: 3,
      total: 0,
      createProjectPath: '/index/createproject'
    }
  },
  computed: {
    isShowPublicBtn(){
      return this.queryType !== 3
    }
  },
  methods: {
    /**
     * 过滤数据,将allList 中的私有项目过滤出，放在privateList中，
     * 并且会根据传入的isShowAll.将传到子组件的projectList进行修改
     * @param isShowAll
     */
    projectListDataFilter(isShowAll){
      if(this.allList == null || this.allList.length <=0 )return
      if(isShowAll){
        this.projectList = this.allList
      }else {
        if(this.privateList == null || this.privateList.length <= 0){
          for (let project of this.allList) {
            if(project.isPublic === false)
              this.privateList.push(project)
          }
        }
        this.projectList = this.privateList
      }
    },
    /**
     * 是否显示全部的开关按钮点击的回调
     * @param isShowAll
     */
    handleIsShowAll(isShowAll){
      this.projectListDataFilter(isShowAll)
    },

    /**
     *  当前页发生变化的回调
     * @param current
     */
    handleCurrentChange(current){
      this.privateList = []
      this.allList = []
      this.currentPage = current
      this.queryProjectList(this.queryType)
    },
    /**
     * 查询类型改变方法
     **/
    handleTypeChange(type){
      if(type === this.queryType) return
      this.currentPage = 1
      this.queryType = type
      this.privateList = []
      this.allList = []
      this.isShowAll = true
      this.queryProjectList(type)
    },
    handleOrderType(){
      this.currentPage = 1
      this.privateList = []
      this.allList = []
      this.isShowAll = true
      this.queryProjectList(this.queryType)
    },
    /**
     * 查询展示的项目列表的网络方法
     * @param type
     */
    queryProjectList(type){
      let query = {}
      query.userId = this.$store.getters.getLoginUser.id
      query.type = type
      query.limit = this.limit
      query.page = this.currentPage
      query.orderType = this.orderType

      queryProjectListNetwork(query).then(data => {
        console.log(data)
        if(data.code === 200){
          let pageInfo = data.result
          this.allList = pageInfo.list
          this.total = pageInfo.total

          this.projectListDataFilter(this.isShowAll)
        }else {
          this.$message.error('查询项目列表失败,'+data.msg)
        }
      })
    },

    toCreateProjectPage() {
      this.$router.push(this.createProjectPath)
    }
  },
}
</script>

<style scoped>
.project-list-area{
  margin-top: 20px;
  background-color: #84ceff;
  padding: 35px 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.project-list-select{
  left: 30px;
  top: 15px;
}
</style>