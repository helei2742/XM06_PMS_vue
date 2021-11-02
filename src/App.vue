<template>
  <div id="app" class="infinite-list"  style="overflow:auto">
    <message-card
        :is-show="isShow"
        :message="message"
        :msg-title="msgTitle"
        :type="type"
    />

    <NavBar :is-login="isLogin" :user="userIfo" @logout="logout"></NavBar>

    <router-view class="main-area"/>


    <div id="footer">

    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import MessageCard from "@/components/message/MessageCard";
import {listenFailEvent,listenCardCloseEvent,
  listenSuccess} from "@/util/eventbus";

import {LOGOUT} from "@/store/mutations-types";

export default {
  name: 'app',
  components: {
    NavBar,
    MessageCard
  },
  data(){
    return {
      isShow: false,
      msgTitle: '',
      message: '',
      type: '',
      height: 0
    }
  },
  computed:{
    isLogin(){
      return this.$store.getters.getLoginUser != null
    },
    userIfo(){
      let loginUser = this.$store.getters.getLoginUser
      if(loginUser == null){
        return '未登录'
      }
      return loginUser
    }
  },
  methods: {
    logout() {
      console.log('登出')
      this.$store.commit(LOGOUT)
      this.$router.push('/login')
    }
  }
  ,
  created() {
    listenFailEvent.call(this, (data)=>{
      console.log(data)
      this.isShow = true
      this.msgTitle = data.msgTitle
      this.message = data.message
      this.type = 'error'

      setTimeout(()=>{
        this.isShow = false
      }, 3000)
    })

    listenSuccess.call(this, (data)=>{
      console.log(data)
      this.isShow = true
      this.msgTitle = data.msgTitle
      this.message = data.message
      this.type = 'success'

      setTimeout(()=>{
        this.isShow = false
      }, 3000)
    })

    listenCardCloseEvent.call(this,()=>{
      this.isShow = false
    })
  }

}
</script>

<style>
body{
  background-color:#545c64;
}
.main-area{
 height: calc(100vh - 49px - 48px)
}
#footer{
  position: fixed;
  height: 49px;
  bottom: 0;
  left: 0;
  right: 0;
  /*background-color: rgba(100, 100, 100, 0.8);*/
}

.submit-task-from div[class='el-upload-dragger']{
  width: 280px;
}
</style>
