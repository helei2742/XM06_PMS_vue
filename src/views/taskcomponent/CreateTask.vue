<template>
<div class="createTask" key="createTask">
  <show-window
      v-loading="loading"
      element-loading-text="创建任务中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
  >

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
              :user-groups="this.$store.getters.getMyGroup"
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
import CreateTaskFrom from "@/views/taskcomponent/createtaskchild/CreateTaskFrom";
import {createTaskNetwork} from "@/network/task";
import {RELOADMYGROUP} from "@/store/mutations-types-groupmodule";

export default {
  name: "CreateTask",
  components:{
    ShowWindow,
    CreateTaskFrom
  },
  data() {
    return {
      loading: false
    }
  },
  methods:{
    createTask(from){
      this.loading = true
      setTimeout(()=>{      createTaskNetwork(from).then(data =>{
        if(data.code === 200){
          this.$message.success('发布任务成功')
        }else {
          this.$message.error(data.msg)
        }
      }).finally(()=>{
        this.loading = false
      })},2000)

    },
  },
  mounted() {
    this.$store.dispatch(RELOADMYGROUP)
  }
}
</script>

<style scoped>

</style>