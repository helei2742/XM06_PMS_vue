<template>
<div class="alter-project">
  <show-window v-loading="loading">

    <div slot="title">
      <i class="el-icon-s-finance"></i>
      <span>项目管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>修改项目信息</span>
    </div>

    <div slot="main">
      <div style="padding: 20px">
        <alter-project-form ref="alterProjectForm"
                            @alterProject="updateProject"
                            :my-groups="myGroups"
                            :project="project"/>
      </div>
    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import AlterProjectForm from "@/views/projectcomponent/child/alterprojectchild/AlterProjectForm";
import {queryProjectByIdNetwork, updateProjectNetwork} from "@/network/project";
import {queryMyGroupNetwork} from "@/network/group";

export default {
  name: "AlterProject",
  components: {AlterProjectForm, ShowWindow},
  data(){
    return {
      project: null,
      myGroups: null,
      loading: false
    }
  },
  methods:{
    updateProject(form){
      updateProjectNetwork(form).then(data=>{
        if(data.code === 200){
          this.$alert('修改成功')
        }else {
          this.$alert('修改失败,'+data.msg)
        }
      })
    }
  },
  activated() {
    let userId = this.$store.getters.getLoginUser.id

    let projectId = this.$route.query.projectId
    let project =  this.$route.query.project

    if(project.id === undefined){
      this.loading = true
       queryProjectByIdNetwork(projectId).then(data=>{
         if(data.code === 200){
           this.project = data.result
         }else {
           this.$alert('网络请求数据失败')
         }

         return queryMyGroupNetwork(userId)
       }).then(data => {
         if(data.code === 200){
           this.myGroups = data.result

           this.$refs.alterProjectForm.setAlterForm(this.project, this.myGroups)
         }else {
           this.$alert('网络请求数据失败')
         }
       }).finally(()=>{
         this.loading = false
       })

    }else {
      this.project = project
      queryMyGroupNetwork(userId).then(data=>{
        if(data.code === 200){
          this.myGroups = data.result
          this.$refs.alterProjectForm.setAlterForm(project,this.myGroups)
        }else {
          this.$alert('网络请求数据失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>