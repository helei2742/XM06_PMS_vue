<template>
  <div id="app" :style="appStyle">


    <NavBar :is-login="isLogin"
            :navbar-bgc="appStyle.backgroundColor"
            :user="userIfo"
            @logout="logout"></NavBar>

    <router-view class="main-area"/>

    <to-top @toTop="toTopClick"
            v-if="isShowToTopBtn"/>

    <div id="footer">

    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";

import {findUserByUserIdStr} from "@/network/user";
import {CHANGECOLORMODULE, CHECKSUCCESS,LOGOUT, SCREENHEIGHTCHANGE, SCREENWIDTHCHANGE} from "@/store/mutations-types";
import {APPBACkGROUND} from "@/util/imageUrl";
import ToTop from "@/components/totop/ToTop";

export default {
  name: 'app',
  components: {
    ToTop,
    NavBar,
  },
  data(){
    return {
      // bgStyle: APPBACkGROUND,
      isShow: false,
      msgTitle: '',
      message: '',
      type: '',
      height: 0,
      lightModule: false,

      screenHeight: 0,
      screenWidth: 0,
      isShowToTopBtn: false
    }
  },
  computed:{
    isLogin(){
      return this.$store.getters.getLoginUser != null
    },
    userIfo(){
      let loginUser = this.$store.getters.getLoginUser
      if(loginUser == null){
        return null
      }
      return loginUser
    },
    appStyle (){
      let appBgc = this.$store.getters.getAppBgc
      return appBgc
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
    },
    toTopClick() {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      console.log(top)
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);

    },
    handleScroll() {
      let scroolheight = Math.floor(document.body.scrollTop
          || document.documentElement.scrollTop || window.pageYOffset)

      this.isShowToTopBtn = scroolheight > 700
    }
  },
  mounted() {

    let s = this.$store.getters.getUserIdStr
    /**
     * 验证登录用户
     */
    findUserByUserIdStr(s).then((data)=>{
      console.log(data)
      if(data.code === 200){
        let user = data.result
        this.$store.commit(CHECKSUCCESS, {loginUser: user})

        // this.$alert('人脸相关尚未完成，请勿使用！！！')
        this.$message.success('欢迎回来:'+ user.userName)
      }else {
        this.$message('您还未登录，请先前往登录')
        this.$router.push('/introduce')
      }
    })

    //监听滚动
    window.addEventListener('scroll', this.handleScroll, true)


    //监听屏幕尺寸
    this.screenHeight = document.body.clientHeight
    this.screenWidth = document.body.clientWidth
    window.onresize = () =>{
      return (()=>{
        this.screenWidth = document.body.clientWidth
        this.screenHeight = document.body.clientHeight
      })()
    }
    // this.$refs[this.refsName].scrollTop = this.$refs[this.refsName].scrollHeight;
  },
  watch: {
    screenHeight: {
      handler: function (val, oldVal){
        this.$store.commit(SCREENHEIGHTCHANGE, {height: val})
      }
    },
    screenWidth: {
      handler: function (val, oldVal){
        this.$store.commit(SCREENWIDTHCHANGE, {width: val})
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop);
  }
}
</script>

<style>

#app{
  position: relative;
  min-height: 100vh;
}
/*
div::-webkit-scrollbar{
  display:none
}
*/

#footer{
  position: absolute;
  height: 49px;
  bottom: -150px;
  left: 0;
  right: 0;
  background-color: rgba(100, 100, 100, 0.8);

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

.submit-task-from .el-descriptions__body{
  background-color: transparent;
}
.submit-task-from .el-textarea__inner{
  background-color: transparent;
}
.submit-task-from > .el-textarea > textarea{
  box-shadow: 0 0 2px rgba(100,100,100,0.3);
}
/* =================  通知界面修改element组件样式 end  =============================== */
</style>
