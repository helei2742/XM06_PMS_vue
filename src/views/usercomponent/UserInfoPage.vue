<template>
<div>
  <show-window key="userInfoPage">
    <div slot="title">
      <i class="el-icon-user"></i>
      用户管理
      <i class="el-icon-arrow-right"></i>
      用户信息
    </div>
    <div slot="main" style="padding: 20px 10px;overflow-x: scroll">
      <el-row>
        <el-col :span="18" :offset="2">
          <div class="user-info" :style="this.$store.getters.getCardColorStyle">
            <el-descriptions title="基本信息"
                             direction="vertical"
                             :column="4"
                             border>
              <el-descriptions-item label="用户名">{{loginUser.userName}}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{loginUser.phone}}</el-descriptions-item>
              <el-descriptions-item label="真实姓名" :span="2">{{loginUser.trueName}}</el-descriptions-item>
              <el-descriptions-item label="注册日期">
                <el-tag size="small">{{formatDate(loginUser.createDate)}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="电子邮箱">{{loginUser.email}}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-col>
      </el-row>

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
  },
  methods:{
    formatDate(time) {
      return this.$formatDate(time)
    }
  }
}
</script>

<style scoped>
.user-info{
  min-width: 300px;
  max-width: 760px;
  border: 1px solid #ffffff;
  border-radius: 7px;
}
</style>