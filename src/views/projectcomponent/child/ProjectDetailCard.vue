<template>
  <div class="project-detail-card">
    <el-row >
      <el-col :xs="22" :sm="22" :md="22" :lg="8" :xl="10">
        <ProjectBaseInfoCard :project="project" :creator="creator"/>
      </el-col>

      <el-col  :xs="22" :sm="22" :md="22" :lg="14" :xl="10" >
        <project-cpt-degree :project="project"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ProjectBaseInfoCard from "@/views/projectcomponent/child/projectbaseinfocard/ProjectBaseInfoCard";
import ProjectCptDegree from "@/views/projectcomponent/child/projectCptDegree/ProjectCptDegree";
export default {
  name: "ProjectDetailCard",
  components: {
    ProjectCptDegree,
    ProjectBaseInfoCard
  },
  props: {
    project: {
      type: Object,
      default() {
        return {}
      }
    },
    creator: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      submitDegreeDesc: ''
    }
  },

}
</script>

<style scoped>

.project-detail-card{
  padding: 30px 20px;
}




</style>