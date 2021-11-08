<template>
  <div>
<div class="line"></div>

<!--  侧边便签框-->
    <memo-drawer
      :is-show="drawer"
      :memo="memo"
      @removememo="removeMemo"
      @addmemo="addMemo"
      @confirmfinish="confirmFinish"
    />


  <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">

<!--  返回上一路由-->
    <el-menu-item @click="pageback" index="2">
      返回
    </el-menu-item>`

  <!--点击打开侧边便签框 -->
    <el-menu-item v-if="isLogin" @click="openDrawer">
      便签
    </el-menu-item>

    <el-menu-item v-if="isLogin" @click="openInform">
      通知
    </el-menu-item>

  <!--登录-->
    <el-submenu v-if="isLogin" id="user-manage" index="1">
      <template slot="title">
        <span>
            <el-avatar :src="headImg" ></el-avatar>
          {{user.userName}}
        </span>
      </template>

      <el-menu-item @click="toUserInfoPage" index="1-1">我的信息</el-menu-item>
      <el-menu-item index="1-2" @click="open">退出登录</el-menu-item>

      <el-menu-item>
      <el-dropdown>
          <span style="color: red" class="el-dropdown-link">
            信息修改<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">修改基本信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check">
          <span @click="alterPwd"> 修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>

      </el-dropdown>
      </el-menu-item>
      </el-submenu>
  <!--    未登录-->
    <el-menu-item v-else id="not-login" @click="toLoginPage">
      点击登录
    </el-menu-item>

  </el-menu>

  </div>
</template>

<script>
import MemoDrawer from '@/components/memodrawer/MemoDrawer'

import {queryMemosByUserIdNetwork,removeUserMemoNetwork
  ,addMemoNetwork, confirmMemoNetwork} from "@/network/memo";

export default {
  data() {
    return {
      activeIndex: '1',
      drawer: false,
      memo: [],
      headImg: require('@/assets/img/head_default.png')
    };
  },
  components: {
    MemoDrawer
  },
  props:{
    user:{
      Type: Object,
      default(){
        return {userName: '张三', trueName: '真正的张三'}
      }
    },
    isLogin:{
      Type: Boolean,
      default: false
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
    alterPwd(){
      console.log('---')
      this.$router.push('/index/passwordalter')
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
    //打开便签栏
    openDrawer(){
      this.drawer = true
      let userId = this.$store.getters.getLoginUser.id
      queryMemosByUserIdNetwork(userId).then(data=>{
        console.log(data)

        if(data.code === 200){
          this.memo = data.result
        }else{
          this.$message.error('出错啦', data.msg)
        }
      })
    },
    //移除便签
    removeMemo(memoId){
      let userId = this.$store.getters.getLoginUser.id
      removeUserMemoNetwork(userId, memoId).then(data=>{
        console.log(data)
        if(data.code === 200){
          this.$message.success('移除便签成功')
        }else {
          this.$message.error('移除便签失败'+data.msg)
        }
      })
    },
    //添加便签
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
        }else{
          this.$message.error('添加标签失败'+data.msg)
        }
      })

    },
    //确认便签已完成
    confirmFinish(memoId){
      let userId = this.$store.getters.getLoginUser.id
      confirmMemoNetwork(userId, memoId).then(data=>{
        console.log(data)
        if(data.code === 200){
          this.$message.success('确认完成成功')
        }else {
          this.$message.error('确认失败'+data.msg)
        }
      })
    },
    openInform(){
      this.$router.push('/index/informview')
    }
  }
}
</script>

<style scoped>
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

</style>