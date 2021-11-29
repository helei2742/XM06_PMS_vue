<template>
  <div class="navbar" :style="navbarStyle">
    <div class="line"></div>

<!--  侧边便签框-->
    <memo-drawer
        v-loading="loading"
      :is-show-memo="drawer"
      :memo="memo"
      @removememo="removeMemo"
      @addmemo="addMemo"
      @confirmfinish="confirmFinish"
    />

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      active-text-color="#ffd04b"
      background-color="transparent"
      @select="handleSelect">


      <el-menu-item style="margin-left: 57px"
                    @click="pageback" index="2">
        <el-tooltip effect="dark"
                    content="上一页面"
                    placement="bottom">
          <i class="el-icon-back" style="font-size: 24px"></i>
        </el-tooltip>
      </el-menu-item>`

      <el-menu-item  v-if="isLogin" index="3">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-tooltip effect="dark"
                        content="更多功能"
                        placement="bottom">
              <i class="el-icon-menu" style="font-size: 24px"></i>
            </el-tooltip>
          </span>

          <el-dropdown-menu slot="dropdown">
            <div style="width: 220px;margin: 10px;text-align: center">
              <el-row>

<!--      打开便签          -->
                <el-col :span="8">
                  <el-tooltip effect="dark"
                              content="便签"
                              placement="bottom">

                    <i class="el-icon-edit-outline more-func-icon"
                       :key="'openDrawer'"
                       @click.stop="openDrawer">
                    </i>
                  </el-tooltip>
                  <div>便签</div>
                </el-col>

<!--      打开通知      -->
                <el-col :span="8">
                  <el-tooltip effect="dark"
                              content="通知"
                              placement="bottom">
                    <i class="el-icon-s-comment more-func-icon"
                       @click="openInform"
                       :key="'openInform'"
                      ></i>
                  </el-tooltip>
                  <div>通知</div>
                </el-col>
              </el-row>

            </div>

          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>


  <!--登录-->
    <el-submenu v-if="isLogin"
                id="user-manage"
                popper-class="bgcClass"
                index="1">
      <template slot="title">
        <div class="navbar-username">
            <el-avatar :src="headImg" ></el-avatar>
             {{user.userName}}
        </div>
      </template>

      <el-menu-item @click="toUserInfoPage" index="1-1">我的信息</el-menu-item>
      <el-menu-item @click="toFaceRegisterPage" index="1-2">人脸信息修改或录入</el-menu-item>
      <el-menu-item index="1-3" @click="open">退出登录</el-menu-item>
      <el-menu-item>
        <el-dropdown>
            <span style="color: red" class="el-dropdown-link">
              信息修改<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item icon="el-icon-plus">修改基本信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-delete">
              <span @click="deleteFaceInfo">删除人脸信息</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">
            <span @click="alterPwd"> 修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-submenu>

  <!--    未登录-->
    <el-menu-item v-if="!isLogin" id="not-login" @click="toLoginPage">
      点击登录
    </el-menu-item>

  </el-menu>

  </div>
</template>

<script>
import MemoDrawer from '@/components/memodrawer/MemoDrawer'

import {queryMemosByUserIdNetwork,removeUserMemoNetwork
  ,addMemoNetwork, confirmMemoNetwork} from "@/network/memo";
import {faceDropNetWork} from "@/network/face";

export default {

  components: {
    MemoDrawer
  },
  computed: {
    navbarStyle() {
      return this.$store.getters.getNavbarBgi
    },
    isLogin() {
      return this.$store.getters.getLoginUser !== null
    }
  },
  data() {
    return {
      activeIndex: '1',
      drawer: false,
      memo: [],
      headImg: require('@/assets/img/head_default.png'),
      loading: false
    };
  },
  props:{
    user:{
      type: Object,
      default(){
        return {userName: '张三', trueName: '真正的张三'}
      }
    },
    navbarBgc: {
      type: String,
      default: 'transparent'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //跳转相关方法
    toLoginPage(){
      this.$router.push('/login')
    },
    toUserInfoPage(){
      this.$router.push('/index/myinfo')
    },
    toFaceRegisterPage() {
      this.$router.push('/index/faceregisterpage')
    },
    alterPwd(){
      console.log('---')
      this.$router.push('/index/passwordalter')
    },
    openInform(){
      this.$router.push('/index/informview')
    },
    pageback(){
      this.$router.back()
    },

    logout(){
      this.$emit('logout')
    },

    //确认是否退出
    open() {
      this.$confirm('是否退出登录？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '退出',
        cancelButtonText: '取消'
      }).then(() => {

        this.logout()
        this.$message({
          type: 'info',
          message: '已退出'
        })
      }).catch(e=>{})
    },

    load(){
      this.drawer = true
      let userId = this.$store.getters.getLoginUser.id
      this.loading = true
      queryMemosByUserIdNetwork(userId).then(data=>{
        if(data.code === 200){
          this.memo.splice(0,this.memo.length)
          this.memo.push(...data.result)
        }else{
          this.$message.error('出错啦', data.msg)
        }
      }).finally(()=>{
        this.loading = false

      })
    },

    //打开便签栏
    openDrawer(){
      this.load()
    },
    //移除便签
    removeMemo(memoId){
      let userId = this.$store.getters.getLoginUser.id
      removeUserMemoNetwork(userId, memoId).then(data=>{
        console.log(data)
        if(data.code === 200){
          this.$message.success('移除便签成功')
          this.load()
        }else {
          this.$message.error('移除便签失败'+data.msg)
        }
      })
    },
    /**
     * 添加便签
     */
    addMemo(info){
      let userId = this.$store.getters.getLoginUser.id
      let memo = info.memo
      let staleDate = info.staleDate
      let createDate = this.$formatDate(new Date().getTime())
      console.log(staleDate, memo, createDate)
      addMemoNetwork(userId,memo,staleDate,createDate).then(data=>{
        console.log(data)
        if(data.code === 200){
          this.$message.success('添加便签成功')
          this.load()
        }else{
          this.$message.error('添加标签失败'+data.msg)
        }
      })
    },
    /**
     * 确认便签完成
     * @param memoId
     */
    confirmFinish(memoId){
      let userId = this.$store.getters.getLoginUser.id
      confirmMemoNetwork(userId, memoId).then(data=>{
        console.log(data)
        if(data.code === 200){
          this.$message.success('确认完成成功')
          this.load()
        }else {
          this.$message.error('确认失败'+data.msg)
        }
      })
    },

    /**
     * 点击删除人脸信息按钮
     */
    deleteFaceInfo() {
      this.$confirm('此操作将永久删除人脸信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let userId = this.$store.getters.getLoginUser.id
        faceDropNetWork(userId).then(data=>{
          if(data.code === 200){
            this.$message.success('已收到删除要求，请前往邮箱确认')
          }else {
            this.$message.error('出错了'+data.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    }

  }
}
</script>

<style scoped>
.navbar-username{
  width: 100%;
  overflow: hidden;
}
.navbar-username:hover{
  overflow: visible;
}
#user-manage{
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 10px;
}

#not-login{
  position: absolute;
  top: 0;
  right: 0;
}

.more-func-icon{
  font-size: 45px;
}
.more-func-icon:hover{
  cursor: pointer;
  color: #ffcf49;
}
</style>