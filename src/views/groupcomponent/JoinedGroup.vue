<template>
<div id="joined-group">
  <show-window key="joinedGroup">
    <div slot="title">
      <i class="el-icon-s-custom"></i>
      <span>小组管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>我加入的小组</span>
    </div>

    <div slot="main">

      <div v-if="isShowGroupList"
           class="infinite-wrapper"
           style="overflow:auto">

        <ul  class="infinite-list"
             :infinite-scroll-disabled="disabled"
             v-infinite-scroll="load" >
          <el-row>
            <li v-for="group in joinedGroup" class="infinite-list-item">
              <el-col style="margin-top: 10px;height: 490px;"
                      :offset="1" :xs="20" :sm="8" :md="8" :lg="8" :xl="8">
                  <group-msg-card :group="group"></group-msg-card>
              </el-col>
            </li>
          </el-row>
        </ul>

        <el-row style="height: 60px" v-if="loading"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.3)"></el-row>
        <el-row style="text-align: center;" v-if="noMore">
          <hr/>
          没有更多了
        </el-row>
      </div>

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
  computed: {
    noMore(){
      return this.currentPage >= this.totalPage;
    },
    disabled() {
      //当两个都为真的时候不加载,页面滚动失效
      return this.loading || this.noMore
    }
  },
  data() {
    return {
      joinedGroup: [],
      currentPage: 1,
      limit: 3,
      totalPage: 10000,
      isShowGroupList: false,
      loading: false,
    }
  },
  methods: {
    load() {
      this.queryJoinedGroup(this.currentPage + 1, this.limit)
    },
    //网络请求加入小组的分页数据
    queryJoinedGroup(currentPage, limit){
      console.log(currentPage, this.totalPage)
      this.loading = true
      let userId = this.$store.getters.getLoginUser.id
      queryJoinedGroupNetwork(userId, currentPage, limit).then(data =>{
        this.loading = false
        let pageInfo = data.result
        if(data.code === 200){
          if(pageInfo.list.length !== 0){
            this.joinedGroup.push(...pageInfo.list)
            this.totalPage = pageInfo.pages
            this.currentPage = pageInfo.pageNum
            this.isShowGroupList = true
            this.$message.success('加载成功')
          }
          console.log(this.currentPage, this.totalPage, '---')
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

.infinite-wrapper{
  width: 100%;
  height: 530px;

}
.infinite-list{
  list-style-type: none;
}

.infinite-list-item{

}
</style>