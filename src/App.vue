<template>
  <div id="app" class="infinite-list"  style="overflow:auto">

    <NavBar :is-login="isLogin" :user="userIfo" @logout="logout"></NavBar>

    <router-view class="main-area"/>


    <div id="footer">

    </div>



  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";

import {CHANGECOLORMODULE, LOGOUT} from "@/store/mutations-types";

export default {
  name: 'app',
  components: {
    NavBar,
  },
  data(){
    return {
      isShow: false,
      msgTitle: '',
      message: '',
      type: '',
      height: 0,
      lightModule: false
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
    },
    colorModuleChange(colorModule){
      this.$store.commit(CHANGECOLORMODULE, {colorModule: colorModule})
      console.log(this.$store.getters.getColorModule)
    }
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
