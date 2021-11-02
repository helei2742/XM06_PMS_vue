<template>

<div id="login">

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
import {emitFailEvent, emitSuccess} from "@/util/eventbus";
import {LOGINSUCCESS} from "@/store/mutations-types";

export default {
  name: "login",
  components:{
    LoginFrom
  },
  data() {
    return {
      logoUrl: require("@/assets/logo.png"),
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

          emitSuccess.call(this,{
            msgTitle: '登录成功',
            message: '即将跳转至主页'
          })

          setTimeout(()=>{
            this.$router.push('/index')
          }, 2000)

        }else{
          //登录失败
          emitFailEvent.call(this, {
            'msgTitle': '出错拉',
            'message': data.msg
          })

        }
      }).catch(e => {
        emitFailEvent.call(this, {
          'msgTitle': '出错拉',
          'message': '检查网络试试'
        })
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
  font-size: 24px;
  font-weight: 300;
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