<template>
  <div class="create-account-from">
    <el-row class="create-account-from-item">
      <el-col :offset="2" :span="20">
        <el-alert title="请输入4到16位用户名" :closable="false"></el-alert>
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </el-col>
    </el-row>

    <el-row class="create-account-from-item">
      <el-col :offset="2" :span="20">
        <el-alert title="请输入6到16位密码" :closable="false"></el-alert>
        <el-input v-model="password" placeholder="请输入密码"></el-input>
      </el-col>
    </el-row>

    <el-row class="create-account-from-item">
      <el-col :offset="2" :span="20">
        <el-alert title="请输入手机号" :closable="false"></el-alert>
        <el-input v-model="phone" placeholder="请输入手机号"></el-input>
      </el-col>
    </el-row>

    <el-row class="create-account-from-item">
      <el-col :offset="2" :span="20">
        <el-alert title="请输入真实姓名" :closable="false"></el-alert>
        <el-input v-model="trueName" placeholder="请输入真实姓名"></el-input>
      </el-col>
    </el-row>

    <el-row class="create-account-from-item">
      <el-col :offset="2" :span="20">
        <el-alert title="请输入电子邮箱" :closable="false"></el-alert>
        <el-input v-model="email" placeholder="请输入邮箱"></el-input>
      </el-col>
    </el-row>

    <el-row class="create-account-from-item">
      <el-col :offset="2" :span="20">
        <el-button @click="createAccount" style="width: 100%" type="primary">创建账户</el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: "CreateAccountFrom",
  data(){
    return {
      username: '',
      password: '',
      email: '',
      phone: '',
      trueName: ''
    }
  },
  methods: {
    createAccount() {
      let user = {
        userName: this.username,
        userPwd: this.password,
        email: this.email,
        phone: this.phone,
        trueName: this.trueName
      }
      console.log(user)
      this.$emit('createaccount', user)
    }
  }
}
</script>

<style scoped>

.create-account-from{
  background-color: rgba(100,100,100,0.1);
  padding: 20px 0;
}

.create-account-from-item{
  margin: 10px 0;
}
</style>