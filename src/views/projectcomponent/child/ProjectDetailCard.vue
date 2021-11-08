<template>
  <div class="project-detail-card">
    <el-row >
      <el-col :span="8" >
        <ProjectBaseInfoCard :project="project"/>
      </el-col>

      <el-col :offset="1" :span="15" >
        <project-cpt-degree :project="project"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProjectBaseInfoCard from "@/components/projectbaseinfocard/ProjectBaseInfoCard";
import ProjectCptDegree from "@/components/projectCptDegree/ProjectCptDegree";
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