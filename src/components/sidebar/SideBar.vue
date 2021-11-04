<template>
  <div id="sidebar">
  <el-row class="tac">
    <el-col :span="24">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item style="background-color:black;">
            <span slot="title">项目管理系统</span>
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
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
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
    }
  }
}
</script>

<style scoped>
#sidebar {
overflow: hidden;
}
/*.el-menu-item*/
</style>