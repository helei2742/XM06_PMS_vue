<template>
<div class="project-detail-card-baseInfo">
  <el-skeleton v-if="project.projectName===undefined" :rows="12" animated/>

  <el-descriptions
      v-else
      :column="1">
    <template slot="title">
      <span style="color: #000000">项目基本信息</span>
    </template>
    <el-descriptions-item label="项目名">{{project.projectName}}</el-descriptions-item>
    <el-descriptions-item label="项目详情">
      <div style="white-space: pre-wrap;">
        {{ project.projectDesc }}
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="创建日期">{{formatDate(project.createDate)}}</el-descriptions-item>
    <el-descriptions-item v-if="creator!=null" label="创建者用户名">{{creator.userName}}</el-descriptions-item>
    <el-descriptions-item v-if="creator!=null" label="创建者真实姓名">{{creator.trueName}}</el-descriptions-item>
    <el-descriptions-item v-if="creator!=null" label="创建者手机号">{{creator.phone}}</el-descriptions-item>
    <el-descriptions-item v-if="creator!=null" label="创建者邮箱">{{creator.email}}</el-descriptions-item>

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
    },
    creator: {
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
  margin: 10px;
  min-height: 400px;
  max-height: 600px;

  padding: 30px 20px;
  border: 1px solid rgba(100,100,100,0.2);
  border-radius: 6px;
  box-shadow: 1px 1px 4px rgba(100,100,100,0.2);
  overflow: scroll;
}
</style>