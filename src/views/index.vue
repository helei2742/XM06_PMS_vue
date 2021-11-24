<template>

  <div id="index">
    <el-row type="flex" justify="center">

<!--侧边框-->
      <el-collapse-transition>
        <div v-if="isShowSidebar"
             :style="$store.getters.getAppBgc"
             class="aside">
            <SideBar/>
        </div>
      </el-collapse-transition>

<!--  占位，本来的sidebar位置-->
      <div v-if="isShowSidebar"
           class="hidden-sm-and-down"
           style="width: 232px">
      </div>

<!--主要区域-->
      <el-col id="main-area" :xs="24" :sm="20" :md="20" :lg="21" :xl="21">
        <keep-alive exclude="SubmitTask GroupDetail">
          <router-view />
        </keep-alive>
      </el-col>

<!-- 汉堡按钮-->
      <el-button id="side-bar-open"
                 @click="isShowSidebar=!isShowSidebar"
                 circle
                 icon="el-icon-s-operation">
      </el-button>

    </el-row>
  </div>

</template>

<script>
import SideBar from "@/components/sidebar/SideBar";
import NavBar from "@/components/navbar/NavBar";



export default {
  components: {
    SideBar,
    NavBar
  },
  data(){
    return {
      drawer: false,
      isShowSidebar: true
    }
  },
  mounted() {



    //初始化时根据屏幕大小决定是否显示侧边框
    let size = this.$store.getters.getScreenSize
    if(size.width < 980){
      this.isShowSidebar = false
    }
  }
}
</script>

<style scoped>


#main-area{
/*  position: absolute;
  right: 0;*/
  padding-bottom: 20px;
  /*background-color: rgba(100,100,100,0.2);*/
}

.aside{
  width: 232px;
  position: fixed;
  height: 100vh;
  left: 0;
  z-index: 1000;
}

#side-bar-open{
  position: fixed;
  top:12px;
  left:15px;
  z-index: 100000;
}

</style>