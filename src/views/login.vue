<template>

<div id="login" :style="bgStyle">

  <div id="login-from">
    <el-avatar style="margin-left: 110px" :size="80" :src="logoUrl" ></el-avatar>

    <div class="title">登录项目管理系统</div>

    <login-from ref="loginfrom" @userlogin="login"/>

    <div class="create-account">
      人脸识别登录 <el-link type="primary" @click="handleFaceLogin">点击识别</el-link>
      <br/>
      没有账号？ <el-link @click="toCreateAccount" type="primary">点击注册</el-link>
    </div>
  </div>

<!--  点击人脸识别登录弹出-->
  <el-dialog title="人脸识别登录"
             :fullscreen="true"
             :visible.sync="isFaceLogin">
    <div style="text-align: center">
    <el-form label-width="auto" inline>
      <el-form-item   label="用户名">
        <el-input id="username" v-model="username"></el-input>
      </el-form-item>
    </el-form>
    </div>
    <face-connect ref="faceConnect"
                  @imgConnected="faceLogin"
                  :is-show-button="false"
                  :is-show-progress="false"
                  :img-save-times="200"
                  :need-img-count="10"/>

    <div style="text-align: center">
      <el-button type="warning" size="mini"
                 @click="handleResetFaceLogin">
        重置
      </el-button>

      <el-button type="primary" size="mini"
                 :disabled="isStartFaceLogin"
                 @click="handleStartFaceLogin">
        开始识别登录
      </el-button>
    </div>
  </el-dialog>

</div>

</template>

<script>
import LoginFrom from "@/components/loginfrom/LoginFrom";
import {findUserByUserIdStr, loginNetwork} from "@/network/user";
import {CHECKSUCCESS, LOGINSUCCESS} from "@/store/mutations-types";
import {LOGINBACKGROUND} from "@/util/imageUrl";
import FaceConnect from "@/components/faceconnect/FaceConnect";
import {faceLoginNetWork} from "@/network/face";

export default {
  name: "login",
  components:{
    FaceConnect,
    LoginFrom,
  },
  data() {
    return {
      isFaceLogin: false,
      bgStyle: LOGINBACKGROUND,
      logoUrl: require("@/assets/img/logo.png"),
      createAccountPath: '/createaccount',
      username: '',
      isStartFaceLogin: false
    }
  },
  methods: {
    /**
     * 点击开始识别登录
     */
    handleStartFaceLogin(){
      if(this.username === '' || this.username == null){
        this.$message.error('请输入用户名')
        return
      }
      this.isStartFaceLogin = true
      this.$refs.faceConnect.startConnect()
    },
    handleResetFaceLogin(){
      this.isStartFaceLogin = false

      this.$refs.faceConnect.reset()
    },
    /**
     * 点击人脸识别登录按钮
     */
    handleFaceLogin(){
      this.$refs.loginfrom.username = this.username
      this.isFaceLogin = true
    },
    toCreateAccount() {
      this.$router.push(this.createAccountPath)
    },
    faceLogin(faces){
      let json = JSON.stringify(faces)
      if(this.username === '' || this.username == null) {
        this.$alert('用户名不能为空')
        return
      }

      const loading = this.$loading({
        lock: true,
        text: '正在对比人脸信息',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      faceLoginNetWork(this.username, json).then(data=>{
        console.log(data)
        if(data.code === 200){
          let userIfo = data.result
          this.$store.commit(LOGINSUCCESS, userIfo)
          this.$message.success('登录成功，即将进入系统')
          setTimeout(()=>{
            findUserByUserIdStr(userIfo.userIdStr).then((data)=>{
              if(data.code === 200){
                let user = data.result
                this.$router.push('/index')
                this.$store.commit(CHECKSUCCESS, {loginUser: user})
              }else {
                this.$message('验证用户失败')

              }
            })

          }, 1500)

          this.$router.push('/introduce')
        }else {
          this.$message('登录失败,'+data.msg)
        }
      }).finally(()=>{
        loading.close()
      })

    },
    /**
     * 登录方法
     */
    login(form){
      let userName = form.username
      let userPwd = form.password

      const loading = this.$loading({
        lock: true,
        text: '正在登录',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      loginNetwork(userName, userPwd).then(data =>{
        if(data.code === 200){
          let userIfo = data.result
          this.$store.commit(LOGINSUCCESS, userIfo)
          this.$message.success('登录成功，即将进入系统')
          setTimeout(()=>{
            findUserByUserIdStr(userIfo.userIdStr).then((data)=>{
              if(data.code === 200){
                let user = data.result
                this.$router.push('/index')
                this.$store.commit(CHECKSUCCESS, {loginUser: user})
              }else {
                this.$message('验证用户失败')
              }
            })
          }, 1500)
        }else{
          //登录失败
         this.$message.error('登录失败, '+data.msg)
        }

      }).catch(e => {
        this.$message.error('出错拉,检查网络试试或联系管理员')
      }).finally(()=>{
        loading.close()
      })
    }
  }
}
</script>

<style scoped>
#login{
  margin-top: -100px;
  min-height: calc(100vh - 49px);
  padding: 70px 0 50px;
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

#video{
  width: 100%;
  height: 50vh;
}

#output{
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 50vh;
}
</style>