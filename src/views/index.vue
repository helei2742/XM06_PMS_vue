<template>

  <div id="index">
    <el-row >
<!--侧边框-->
      <el-col id="aside" :xs="0" :sm="4" :md="4" :lg="3" :xl="3">
        <SideBar/>
      </el-col>
<!--主要区域-->
      <el-col id="main-area" :xs="24" :sm="20" :md="20" :lg="21" :xl="21">
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-col>

<!-- 屏幕缩小到sm后侧边栏的汉堡按钮-->
      <el-button id="side-bar-open"
                 class="hidden-sm-and-up"
                 @click="drawer= true"
                 size="mini"
                 icon="el-icon-s-operation"></el-button>
      <el-drawer
          :visible.sync="drawer"
          :with-header="false"
          :show-close="false"
          direction="ttb">
        <SideBar/>
      </el-drawer>

    </el-row>
  </div>

</template>

<script>
import SideBar from "@/components/sidebar/SideBar";
import NavBar from "@/components/navbar/NavBar";
import {findUserByUserIdStr} from "@/network/user";
import {emitFailEvent} from "@/util/eventbus";
import {CHECKSUCCESS} from "@/store/mutations-types";

export default {
  components: {
    SideBar,
    NavBar
  },
  data(){
    return {
      drawer: false
    }
  },
  mounted() {
    let s = this.$store.getters.getUserIdStr
    console.log('index.vue组件挂载完成')

    /**
     * 验证登录用户
     */
    findUserByUserIdStr(s).then((data)=>{
      console.log(data)
      if(data.code === 200){
        let user = data.result
        this.$store.commit(CHECKSUCCESS, {loginUser: user})
      }else {
        emitFailEvent.call(this, {
          msgTitle: '出错了',
          message: '验证登录用户失败'
        })
      }
    })

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

#aside{
/*  position: absolute;
  left: 0;*/
  height: calc(100vh - 120px);
  background-color: rgba(100, 100, 100, 0.8);
}

#side-bar-open{
  position: fixed;
  top:74px;
  left:9px;
}

</style>