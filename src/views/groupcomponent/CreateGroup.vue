<template>
<div class="create-group" v-if="destroyYet">

  <show-window>

    <div slot="title">
      <i class="el-icon-s-custom"></i>
      <span>小组管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>创建小组</span>
    </div>
    <div slot="main">
      <create-group-from
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
import {emitSuccess,emitFailEvent} from "@/util/eventbus";

export default {
  name: "CreateGroup",
  components: {
    CreateGroupFrom,
    ShowWindow
  },
  data(){
    return {
      destroyYet: true
    }
  },
  methods: {

    createGroup(groupInfo) {
      let loginUser = this.$store.getters.getLoginUser
      groupInfo.managerId = loginUser.id
      createGroupNetwork(groupInfo).then(data=>{
        console.log(data)
        if(data.code === 200){
          emitSuccess.call(this, {
           msgTitle: '小组创建成功',
          })
        }else{
          emitFailEvent.call(this, {
            msgTitle: '创建小组失败',
            message: data.msg
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>