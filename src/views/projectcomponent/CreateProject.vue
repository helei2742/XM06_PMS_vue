<template>
  <div class="create-project">

    <show-window
        v-loading="loading"
        element-loading-text="发布任务中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        key="createProject">
      <div slot="title">
        <i class="el-icon-s-finance"></i>
        <span>项目管理</span>
        <i class="el-icon-arrow-right"></i>
        <span>创建项目</span>
      </div>

      <div slot="main">
        <el-row>
        <el-col :offset="1" :xs="22" :sm="18" :md="14" :lg="10" :xl="10">

          <create-project-form-table
              :group-list="this.$store.getters.getMyGroup"
              @createproject="createProject"
          />
        </el-col>
        </el-row>
      </div>
    </show-window>
  </div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow"
import CreateProjectFormTable from "@/views/projectcomponent/child/CreateProjectFormTable"
import {createProjectNetwork} from "@/network/project";

export default {
  name: "CreateProject",
  components: {
    ShowWindow,
    CreateProjectFormTable
  },
  data() {
    return {
      groupList: [],
      loading: false
    }
  },
  methods:{
    createProject(projectForm){
      projectForm.creatorId = this.$store.getters.getLoginUser.id
      this.loading = true

      createProjectNetwork(projectForm).then(data=>{
        if(data.code === 200){
          this.$message.success('创建成功')
        }else {
          this.$message.error('创建失败' + decodeURI(data.msg))
        }
      }).finally(()=>{
        this.loading = false
      })
    }
  },
  mounted() {
    // 异步网络请求获取加入的小组，并加入vuex， 使用时直接使用: 动态绑定$store里的值到子组件里
    this.$store.dispatch('reloadMyGroup')
  }
}
</script>

<style scoped>

</style>