<template>
<div class="createTask" key="createTask">
  <show-window>
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>任务管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>发部任务</span>
    </div>
    <div slot="main">
      <el-row>
        <el-col :offset="1" :xs="22" :sm="18" :md="14" :lg="10" :xl="10">
          <create-task-from
              style="margin-top: 40px"
              ref="createTaskFrom"
              :user-groups="userGroups"
              @querygroup="queryJoinedGroup"
              @createtask="createTask"
          />
        </el-col>
      </el-row>
    </div>
  </show-window>

</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import CreateTaskFrom from "@/views/taskcomponent/child/CreateTaskFrom";
import {queryJoinedGroupAllNetwork} from "@/network/group";
import {createTaskNetwork} from "@/network/task";

export default {
  name: "CreateTask",
  components:{
    ShowWindow,
    CreateTaskFrom
  },
  data() {
    return {
      userGroups: null
    }
  },
  methods:{
    createTask(from){
      createTaskNetwork(from).then(data =>{
        console.log(data)
        if(data.code === 200){
          this.$message.success('发布任务成功')
        }else {
          this.$message.error(data.msg)
        }
      })
    },
    queryJoinedGroup(){
      if(this.userGroups != null && this.userGroups.length !== 0){
        return
      }
      let userId = this.$store.getters.getLoginUser.id
      queryJoinedGroupAllNetwork(userId).then(data=>{
        if(data.code === 200){
          this.userGroups = data.result
          console.log(this.userGroups)
        }else {
          this.$message.error('出错了，'+data.msg)
        }
      })
    }
  },
  mounted() {
    this.queryJoinedGroup()
  }
}
</script>

<style scoped>

</style>