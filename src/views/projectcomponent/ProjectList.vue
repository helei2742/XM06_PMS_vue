<template>
  <div class="project-list">
    <show-window
        v-loading="loading"
        element-loading-text="加载数据中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        key="projectList">

      <div slot="title">
        <i class="el-icon-s-finance"></i>
        <span>项目管理</span>
        <i class="el-icon-arrow-right"></i>
        <span>项目列表</span>
      </div>

      <div slot="main">

        <!-- 选择按钮套件-->
        <div class="project-list-select" >
          <div>
            <el-button :type="this.queryType === allQueryType.userCreateProject?'success':'primary'"
                       @click="handleTypeChange(allQueryType.userCreateProject)" size="mini">我创建的项目</el-button>
          </div>
          <div>
            <el-button :type="this.queryType === allQueryType.joinedGroupProject?'success':'primary'"
                       @click="handleTypeChange(allQueryType.joinedGroupProject)" size="mini">我加入小组的项目</el-button>
          </div>

          <div>
            <el-button :type="this.queryType === allQueryType.publicProject?'success':'primary'"
                       @click="handleTypeChange(allQueryType.publicProject)" size="mini">查看公开的项目</el-button>
          </div>
          <div>
            <el-select v-model="orderType" placeholder="请选择" size="mini">
              <el-option label="创建时间降序" :value="allSortType.createDateDesc"/>
              <el-option label="创建时间升序" :value="allSortType.createDateAsc"/>
              <el-option label="完成度降序" :value="allSortType.completionDegreeDesc"/>
              <el-option label="完成度升序" :value="allSortType.completionDegreeAsc"/>
            </el-select>
            <el-button type="success" size="mini" @click="handleOrderType">排序</el-button>
          </div>
          <div>
            <el-input v-model="queryProjectName" placeholder="请输入项目名称" size="mini" style="width: 65%"></el-input>
            <el-button :type="this.queryType === allQueryType.nameLikeProject?'success':'primary'"
                       @click="handleTypeChange(allQueryType.nameLikeProject)" size="mini">小组名查找</el-button>
          </div>

        </div>

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

             <project-list-card :card-style="getProjectListCardStyle"
                                :project-list="projectList"/>
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
import {CREATEDATEDESC, CREATEDATEASC, COMPLETIONDEGREEASC, COMPLETIONDEGREEDESC} from "@/network/project.js";
import {PAGEQUERYPROJECTBYUSERID,
        PAGEQUERYPUBLICPROJECT,
        PAGEQUERYUSERJOINEDGROUPPROJECT,
        PAGEQUERYNAMELIKEPROJECT} from "@/network/project.js";

export default {
  name: "ProjectList",
  components: {ProjectListCard, ShowWindow},
  data() {
    return {
      allQueryType:{
        userCreateProject: PAGEQUERYPROJECTBYUSERID,
        publicProject: PAGEQUERYPUBLICPROJECT,
        joinedGroupProject: PAGEQUERYUSERJOINEDGROUPPROJECT,
        nameLikeProject: PAGEQUERYNAMELIKEPROJECT
      },
      allSortType: {
        createDateDesc: CREATEDATEDESC,
        createDateAsc: CREATEDATEASC,
        completionDegreeDesc: COMPLETIONDEGREEDESC,
        completionDegreeAsc: COMPLETIONDEGREEASC
      },
      //查询条件相关
      queryType: 0,
      orderType: 1,
      isShowAll: true,
      queryProjectName: '',
      //显示列表相关
      projectList: [],
      privateList: [],
      allList:[],
      //分页相关
      currentPage: 1,
      limit: 3,
      total: 0,

      createProjectPath: '/index/createproject',
      //正在加载
      loading: false
    }
  },
  computed: {
    isShowPublicBtn(){
      return this.queryType !== 3
    },
    getProjectListCardStyle() {
      return this.$store.getters.getCardColorStyle
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
      //小组名查询
      if(type === this.allQueryType.nameLikeProject){
        if(this.queryProjectName == null
            || this.queryProjectName === '') {
          this.$message.warning('请输入项目名称')
          return
        }
      }else {
        if(type === this.queryType) return
      }
      this.currentPage = 1
      this.queryType = type
      this.privateList = []
      this.allList = []
      this.isShowAll = true
      this.queryProjectList(type)
    },
    /**
     *  排序类型发生改变
     */
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
      query.projectName = this.queryProjectName

      this.loading = true
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
      }).finally(()=> {this.loading = false})
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
  padding: 35px 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.project-list-select{
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  padding-left: 10px;
}
.project-list-select>div{
  margin: 10px 5px;
}
</style>