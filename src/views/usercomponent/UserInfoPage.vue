<template>
<div>
  <show-window>
    <div slot="title">
      <i class="el-icon-user"></i>
      用户管理
      -->
      我的信息
    </div>
    <div slot="main">
      <el-col :span="18" :offset="2">
      <el-descriptions title="基本信息" direction="vertical" :column="4" border>
        <el-descriptions-item label="用户名">{{loginUser.userName}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{loginUser.phone}}</el-descriptions-item>
        <el-descriptions-item label="真实姓名" :span="2">{{loginUser.trueName}}</el-descriptions-item>
        <el-descriptions-item label="注册日期">
          <el-tag size="small">{{loginUser.createDate}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="电子邮箱">{{loginUser.email}}</el-descriptions-item>
      </el-descriptions>
      </el-col>
    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";

export default {
  name: "UserInfoPage",
  components: {
    ShowWindow
  },
  computed: {
    loginUser(){
      return this.$store.getters.getLoginUser
    }
  }
}
</script>

<style scoped>

</style>