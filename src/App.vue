<template>
  <div id="app" class="infinite-list"  :style="bgStyle">

    <NavBar :is-login="isLogin" :user="userIfo" @logout="logout"></NavBar>

    <router-view class="main-area"/>


    <div id="footer">

    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";

import {CHANGECOLORMODULE, LOGOUT} from "@/store/mutations-types";
import {APPBACkGROUND} from "@/util/imageUrl";

export default {
  name: 'app',
  components: {
    NavBar,
  },
  data(){
    return {
      bgStyle: APPBACkGROUND,
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

/*
div::-webkit-scrollbar{
  display:none
}
*/

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

.my-group-list >div[class='el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition']{
  background-color: transparent;
}

.project-detail-card div[class="el-descriptions__body"]{
  background-color: transparent;
}
/*
  description 去边框 start
*/
.project-list-card table[class='el-descriptions__table is-bordered'] td,th{
  border: none!important;
}
.show-task-desc table[class='el-descriptions__table is-bordered'] td,th{
  border: none!important;
}
.group-detail table[class='el-descriptions__table is-bordered'] td,th{
  border: none!important;
}
/*
  description 去边框 end
*/




/* =================  通知界面修改element组件样式 start =============================== */
.project-list-card div[class='el-card__header'] {
  padding: 0 0;
}

.inform-view-main-area>div[class='el-tabs el-tabs--left el-tabs--border-card']{
  background-color: transparent;
}
.inform-view-main-area>div[class='el-tabs el-tabs--top el-tabs--border-card']{
  background-color: transparent;
}

.inform-view-main-area>div[class='el-tabs el-tabs--left el-tabs--border-card']>div[class='el-tabs__content']{
  padding: 0;
}
.inform-view-main-area>div[class='el-tabs el-tabs--top el-tabs--border-card']>div[class='el-tabs__content']{
  padding: 0;
}

div[class='el-tabs el-tabs--left el-tabs--border-card']>div[class='el-tabs__header is-left']{
  background-color: transparent;
  margin-right: 0!important;
}
div[class='el-tabs el-tabs--top el-tabs--border-card']>div[class='el-tabs__header is-top']{
  background-color: transparent;
  margin-right: 0!important;
}
/* =================  通知界面修改element组件样式 end  =============================== */
</style>
