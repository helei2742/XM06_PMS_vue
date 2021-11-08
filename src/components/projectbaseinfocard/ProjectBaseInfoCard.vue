<template>
<div class="project-detail-card-baseInfo">
  <el-descriptions
      :column="1">
    <template slot="title">
      <span style="color: #000000">项目基本信息</span>
    </template>
    <el-descriptions-item label="项目名">{{project.projectName}}</el-descriptions-item>
    <el-descriptions-item label="项目详情">{{ project.projectDesc }}</el-descriptions-item>
    <el-descriptions-item label="创建日期">{{formatDate(project.createDate)}}</el-descriptions-item>

  </el-descriptions>
</div>
</template>

<script>
export default {
  name: "ProjectBaseInfoCard",
  props: {
    project: {
      type: Object,
      default: null
    }
  },
  methods: {
    formatDate(time) {
      return this.$formatDate(time)
    }
  }
}
</script>

<style scoped>
.project-detail-card-baseInfo{
  min-height: 400px;
  padding: 30px 20px;
  border: 1px solid rgba(100,100,100,0.2);
  border-radius: 6px;
  box-shadow: 1px 1px 4px rgba(100,100,100,0.2);
  overflow: scroll;
}
</style>