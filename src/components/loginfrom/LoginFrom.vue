<template>
<div class="login-from">
  <div  class="login-from-item">
    <label for="username">
      Username or email address
    </label>
      <el-input id="username" placeholder="请输入用户名" v-model="username" size="small"></el-input>
  </div>

  <div class="login-from-item" >
      <label for="password" style="position: relative">
        Password
        <el-link style="position: absolute; right: 2px" type="danger">忘记密码？</el-link>
      </label>

      <el-input id="password" placeholder="请输入密码" v-model="password" size="small" show-password></el-input>

  </div>
  <div class="login-from-item">
      <el-button style="width: 100%" @click="login" type="primary" round>登录</el-button>
  </div>

</div>
</template>

<script>
export default {
  name: "LoginFrom",
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods:{
    login(){
      this.$emit('userlogin')
    }
  }
}
</script>

<style scoped>
.login-from{
  text-align: right;
  padding: 20px 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 260px;
  background-color: #f6f8fa;
}
.login-from-item{
  margin: 10px 0;
  font-size: 14px;
  text-align: left;
  font-weight: 400;
}
.login-from-item>label{
  display: block;
  width: 100%;
  margin-bottom: 7px;
}
</style>