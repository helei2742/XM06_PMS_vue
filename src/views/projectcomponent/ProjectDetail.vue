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

    <div slot="main">
      <project-detail-card :project="project"/>
    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import ProjectDetailCard from "@/views/projectcomponent/child/ProjectDetailCard";

export default {
  name: "ProjectDetail",
  components: {
    ShowWindow,
    ProjectDetailCard
  },
  data() {
    return {
      project: null
    }
  },
  activated() {

    this.project = this.$route.query.project
    console.log(this.project)
  }
}
</script>

<style scoped>

</style>