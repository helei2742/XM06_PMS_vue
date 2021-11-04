<template>
<div class="project-list-card">
  <el-card v-for="project in projectList"
           shadow="hover"
           class="box-card">
    <div slot="header" class="clearfix">
      <span class="project-title">{{project.projectName}}</span>
      <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
    </div>

    <div>
      <div>{{project.projectDesc}}</div>
    </div>


  </el-card>

</div>
</template>

<script>
export default {
  name: "ProjectListCard",
  props: {
    projectList: {
      type: Array,
      default: []
    }
  }

}
</script>

<style scoped>

.project-list-card{
  padding-top: 10px;
  margin-top: 10px;
}

.project-title{
  font-size: 16px;
  font-weight: bold;

}
.box-card{
  margin: 15px 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>