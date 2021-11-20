<template>
  <div id="sidebar">

    <div class="sidebar-menu">
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="transparent"
          @open="handleOpen"
          @close="handleClose">

        <el-menu-item>
          <span slot="title">
            <span style="display: inline-block;
                  font-size: 20px;
                  border-bottom: 3px #975651 solid;
                  width: 100%;text-align: center">
              项目管理系统
            </span>
          </span>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>小组管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="createGroup">创建小组</el-menu-item>
            <el-menu-item index="1-2" @click="joinInGroup">加入小组</el-menu-item>
            <el-menu-item index="1-3" @click="joinedGroup">加入的小组</el-menu-item>
            <el-menu-item index="1-4" @click="myGroup">管理的小组</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>任务管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="createTask">发布任务</el-menu-item>
            <el-menu-item index="2-2" @click="showTask">查看任务</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-finance"></i>
            <span>项目管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="createProject">创建项目</el-menu-item>
            <el-menu-item index="3-2" @click="projectList">项目列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>


      </el-menu>
    </div>

    <div v-if="isShowAnnounce" class="public-inform">
      <announcement @closeThis="announcementClose"/>
    </div>
  </div>

</template>

<script>
import Announcement from "@/components/announcement/Announcement";
export default {
  components: {Announcement},
  props:{
    user: {
      type: Object,
      default(){
        return {userName: 'zhangsan', trueName: '张三'}
      }
    }
  },
  data(){
    return {
      isShowAnnounce: true,

      createGroupPath: '/index/creategroup',
      joinInGroupPath: '/index/joiningroup',
      joinedGroupPath: '/index/joinedgroup',
      myGroupPath: '/index/mygroup',

      createTaskPath: '/index/createtask',
      showTaskPath: '/index/showtask',

      createProjectPath: '/index/createproject',
      projectListPath: '/index/projectlist'
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    createGroup(){
      this.$router.push(this.createGroupPath)
    },
    joinInGroup(){
      this.$router.push(this.joinInGroupPath)
    },
    joinedGroup(){
      this.$router.push(this.joinedGroupPath)
    },
    myGroup(){
      this.$router.push(this.myGroupPath)
    },
    createTask(){
      this.$router.push(this.createTaskPath)
    },
    showTask() {
      this.$router.push(this.showTaskPath)
    },
    createProject() {
      this.$router.push(this.createProjectPath)
    },
    projectList(){
      this.$router.push(this.projectListPath)
    },

    announcementClose() {
      this.isShowAnnounce = false
    }
  }
}
</script>

<style scoped>
#sidebar {
  height: calc(100vh - 67px);
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid rgba(100,100,100,0.7);
  border-top: 2px solid #ffac1f;
  border-right: 1px solid rgba(100,100,100,0.7);
}

.sidebar-menu{
  position: absolute;
  width: 100%;
  top:0;
  left: 0;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.public-inform{
  position: absolute;
  left: 0;
  top: 500px;
  width: 100%;
  border-top: 1px rgba(100,100,100,0.7) solid;
  height: 145px;
  background-color: #ffffff;
}
/*.el-menu-item*/
</style>