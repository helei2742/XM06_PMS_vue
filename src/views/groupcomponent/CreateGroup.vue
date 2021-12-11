<template>
<div class="create-group" v-if="destroyYet" key="createGroup">

  <show-window
    v-loading="loading"
    element-loading-text="创建小组中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >

    <div slot="title">
      <i class="el-icon-s-custom"></i>
      <span>小组管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>创建小组</span>
    </div>

    <div slot="main" >
      <create-group-from
          :card-style="cardStyle"
          @creategroup="createGroup"
      />
    </div>

  </show-window>

</div>
</template>

<script>
import CreateGroupFrom from "@/views/groupcomponent/creategroupchild/CreateGroupFrom";
import ShowWindow from "@/components/showwindow/ShowWindow";

import {createGroupNetwork} from "@/network/group";


export default {
  name: "CreateGroup",
  components: {
    CreateGroupFrom,
    ShowWindow
  },
  computed: {
    cardStyle(){
      return this.$store.getters.getCardColorStyle
    }
  },
  data(){
    return {
      destroyYet: true,
      loading: false
    }
  },
  methods: {

    createGroup(groupInfo) {
      let loginUser = this.$store.getters.getLoginUser
      groupInfo.managerId = loginUser.id
      this.loading = true
      createGroupNetwork(groupInfo).then(data=>{
        if(data.code === 200){
          this.$message.success('创建小组成功')
        }else{
          this.$message.error('创建失败,'+data.msg)
        }
      }).finally(()=>{
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>