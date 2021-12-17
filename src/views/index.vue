<template>

  <div id="index">
    <el-row type="flex" justify="center">
<!--侧边框-->
      <transition name="el-zoom-in-center">
        <div v-if="sideBarModel !== 2"
             :style="$store.getters.getAppBgc"
             :class="{'aside-collapse': sideBarModel===3}"
             class="aside">
          <SideBar :is-collapse="sideBarModel===3"/>
        </div>
      </transition>

<!--  占位，本来的sidebar位置-->
      <div v-if="sideBarModel !== 2"
           :style="sideBarWidth">
      </div>

<!--主要区域-->
      <el-col id="main-area" >
<!--        标签栏-->
        <div style="height: 40px;width: 100%">
          <el-tabs v-model="currentTabName"
                   @tab-click="tabClick"
                   @tab-add="tabAdd"
                   @tab-remove="tabRemove"
                   type="card"
                   editable>

            <el-tab-pane v-for="(item,index) in $store.getters.getTabs"
                         :key="item.name"
                         :name="item.name"
                         :path="item.path"
                         :query="item.query"
                         :label="item.label">
            </el-tab-pane>
          </el-tabs>
        </div>

        <keep-alive exclude="SubmitTask GroupDetail">
          <router-view />
        </keep-alive>
      </el-col>

<!-- 调整侧边栏大小的按钮-->
      <el-button id="side-bar-open"
                 @click="handleSideBarModel"
                 circle
                 icon="el-icon-s-operation">
      </el-button>

    </el-row>
    <kan-ban-mu-su-me/>

  </div>

</template>

<script>
import SideBar from "@/components/sidebar/SideBar";
import NavBar from "@/components/navbar/NavBar";
import {REMOVETAB} from "@/store/mutations-types";
import KanBanMuSuMe from "@/components/live2d/KanBanMuSuMe";



export default {
  components: {
    KanBanMuSuMe,
    SideBar,
    NavBar
  },
  computed:{
    sideBarWidth(){
      if(this.sideBarModel === 1){
        return {'width':'232px'}
      }else if(this.sideBarModel === 3){
        return {'width':'65px'}
      }else {
        return {'width':0}
      }
    },
    /**
     * store中存储的是当前选择的tabName,通过计算属性动态绑定到标签栏
     */
    currentTabName: {
      get(){
        return this.$store.getters.getCrtTabName
      },
      set(v){
      }
    }

  },
  data(){
    return {
      drawer: false,
      //模式有三种， 为1时为全展开，为3时为部分收缩，只留下图标。为2时全隐藏
      sideBarModel: 1,
    }
  },
  methods:{
    handleSideBarModel(){
      this.sideBarModel = (this.sideBarModel+1)%3 + 1
      if(this.$store.getters.getScreenSize.width < 400){
        if(this.sideBarModel === 1) this.sideBarModel = 3
      }
    },
    /**
     * 点击后获取点击页的路径和query，跳转即可
     * @param tab
     */
    tabClick(tab){
      let path = tab.$attrs.path
      let query = JSON.parse(JSON.stringify(tab.$attrs.query))

      this.$router.push({
        path,
        query
      })
    },
    tabRemove(name){
      if(name === '1') return
      this.$store.commit(REMOVETAB, {name})
    },
    tabAdd(){
      this.$alert('更多功能请查看用户说明', '提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      })
    }
  },
  mounted() {
    //初始化时根据屏幕大小决定是否显示侧边框
    let size = this.$store.getters.getScreenSize
    if(size.width >= 980){
      this.sideBarModel = 1
    }else {
      this.sideBarModel = 3
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
.aside-collapse{
  width: 65px;
  position: fixed;
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