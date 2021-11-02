<template>
<div id="joined-group">
  <show-window>
    <div slot="title">
      <i class="el-icon-s-custom"></i>
      <span>小组管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>我加入的小组</span>
    </div>

    <div slot="main">

      <ul v-if="isShowGroupList" class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="group in joinedGroup" class="infinite-list-item">

          <el-col style="margin-top: 10px" :offset="1" :xs="20" :sm="8" :md="8" :lg="8" :xl="8">
              <group-msg-card :group="group"></group-msg-card>
          </el-col>
        </li>
      </ul>
      <div v-else>
        您还未加入任何小组哦，点击前往
        <el-link @click="toJoinInPage">添加小组</el-link>
      </div>
    </div>

  </show-window>
</div>
</template>

<script>
import ShowWindow from '@/components/showwindow/ShowWindow.vue'
import GroupMsgCard from "@/views/groupcomponent/joinedgroupchild/GroupMsgCard";

import {queryJoinedGroupNetwork} from "@/network/group";

export default {
  name: "JoinedGroup",
  components: {
    ShowWindow,
    GroupMsgCard
  },
  data() {
    return {
      joinedGroup: [],
      currentPage: 1,
      limit: 3,
      totalPage: 1,
      isShowGroupList: false
    }
  },
  methods: {
    load() {
      this.queryJoinedGroup(this.currentPage, this.limit)
    },
    //网络请求加入小组的分页数据
    queryJoinedGroup(currentPage, limit){
      if(currentPage > this.totalPage){
        this.$message.info('已经是最后的了')
        return
      }
      let userId = this.$store.getters.getLoginUser.id
      queryJoinedGroupNetwork(userId, currentPage, limit).then(data =>{
        let pageInfo = data.result
        if(data.code === 200){
          if(pageInfo.list.length !== 0){
            this.joinedGroup.push(...pageInfo.list)
            this.currentPage ++
            this.totalPage = pageInfo.pages
            this.isShowGroupList = true
            this.$message.success('加载成功')
          }
        }else {
          this.$message.error('加载失败')
        }
      })
    },

    toJoinInPage(){
      this.$router.push('/index/joiningroup')
    }
  },
  mounted() {
    this.queryJoinedGroup(1,this.limit)
  }
}
</script>

<style scoped>
#joined-group{
  width: 100%;
  height: 100%;
}
.infinite-list{
  height: 450px;
  list-style-type: none;
}

.infinite-list-item{
}
</style>