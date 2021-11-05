<template>

<div id="login" :style="bgStyle">

  <div id="login-from">
    <el-avatar style="margin-left: 110px" :size="80" :src="logoUrl" ></el-avatar>

    <div class="title">登录项目管理系统</div>
    <login-from ref="loginfrom" @userlogin="login"/>

    <div class="create-account">
      没有账号？ <el-link @click="toCreateAccount" type="primary">点击注册</el-link>
    </div>
  </div>

</div>

</template>

<script>
import LoginFrom from "@/components/loginfrom/LoginFrom";
import {loginNetwork} from "@/network/user";
import {LOGINSUCCESS} from "@/store/mutations-types";
import {LOGINBACKGROUND} from "@/util/imageUrl";

export default {
  name: "login",
  components:{
    LoginFrom
  },
  data() {
    return {
      bgStyle: LOGINBACKGROUND,
      logoUrl: require("@/assets/img/logo.png"),
      createAccountPath: '/createaccount'
    }
  },
  methods: {
    toCreateAccount() {
      this.$router.push(this.createAccountPath)
    },
    /**
     * 登录方法
     */
    login(){
      let userName = this.$refs.loginfrom.username
      let userPwd = this.$refs.loginfrom.password

      loginNetwork(userName, userPwd).then(data =>{
        console.log('服务器返回数据',data)
        if(data.code === 200){
          let userIfo = data.result
          this.$store.commit(LOGINSUCCESS, userIfo)
          this.$message.success('登录成功，即将进入系统')

          setTimeout(()=>{
            this.$router.push('/index')
          }, 2000)

        }else{
          //登录失败
         // this.$message.error('登陆失败,'+ data.msg)
         this.$message.error('魔理沙发出警告, '+data.msg)
        }
      }).catch(e => {
        this.$message.error('出错拉,检查网络试试或联系管理员')
      })
    }

  }
}
</script>

<style scoped>
#login{
  margin-top: -100px;
  height: calc(100vh - 49px);
  background-color: #fff;
  padding-top: 70px;
}
#login-from{
  width: 300px;
  margin: 100px auto;
}
.title{
  font-size: 30px;
  font-weight: 800;
  color: rgba(0,0,0,0.1) !important;
  -webkit-text-stroke: 1px rgba(100,200,150,0.7);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;

  text-align: center;
  width: 100%;

  margin: 20px 0;
}
.create-account{
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 20px;
  font-size: 15px;
  font-weight: 400;
  margin: 20px 0;
}
</style>