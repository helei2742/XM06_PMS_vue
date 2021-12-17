<template>

<!--
  加入的小组
-->
<div class="join-in-group">
    <show-window v-loading="loading"
                 element-loading-text="加载数据中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(0, 0, 0, 0.8)"
                 key="joininGroup">

      <div slot="title">
        <i class="el-icon-s-custom"></i>
        <span>小组管理</span>
        <i class="el-icon-arrow-right"></i>
        <span>加入小组</span>
      </div>

      <div slot="main">
        <el-row style="margin-top: 20px">
        <el-col :offset="3" :span="18">

        <group-list
            :group-list="groupList"
            :card-style="cardColorStyle"
            @joiningroup="joinInGroup"
            @searchgroupname="searchByGroupName"
        />

          <div class="scroll-pagination" style="overflow: scroll">

            <el-pagination
                v-show="isShowPagination"
                class="pagination"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                :pager-count="7"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>

          </div>
        </el-col>
        </el-row>

      </div>
    </show-window>

</div>

</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import GroupList from "@/views/groupcomponent/joiningroupchild/GroupList";

import {
  joinInGroupNetwork,
  pageQueryAllGroupNetwork,
  queryGroupByNameNetwork,
  queryGroupLikeGroupNameNetwork
} from "@/network/group";



export default {
  name: "JoinInGroup",
  components: {ShowWindow, GroupList},
  computed: {
    cardColorStyle() {
      return this.$store.getters.getCardColorStyle
    }
  },
  data(){
    return {
      groupList: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      isShowPagination: true,
      loading: false,
      queryGroupName: ''
    }
  },
  methods: {
    /**
     * 根据输入的组名查找组
     */
    searchByGroupName(groupName){
      this.currentPage = 1
      this.queryGroupName = groupName
      //没有输入小组名，默认查询全部
      if(groupName.length < 1){
        this.pageQueryAllGroup(this.currentPage, this.pageSize)
        this.isShowPagination = true
        return
      }

      //有小组名
      const loading = this.$loading({
        lock: true,
        text: '正在查找小组',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      queryGroupLikeGroupNameNetwork(groupName).then(data =>{
        console.log(data)
        this.groupList = data.result
        this.total = data.result.length | 0
        this.isShowPagination = false
      }).finally(()=>{
        loading.close()
      })
    },

    /**
     * 加入小组方法， from中属性需含有
     *  userId           用户id
     *  groupId          小组id
     *  invitationCode  邀请码
     */
    joinInGroup(from) {
      from.userId = this.$store.getters.getLoginUser.id
      const loading = this.$loading({
        lock: true,
        text: '正在处理请求',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      joinInGroupNetwork(from).then(data => {
        if(data.code === 200){
           this.$message.success('加入小组成功')
        }else{
          this.$message.error('加入失败,'+data.msg)
        }
      }).finally(()=>{
        loading.close()
      })
    },

    /**
     * 当前页改变回调方法
     */
    handleCurrentChange(current){
      this.pageQueryAllGroup(current, this.pageSize)
    },

    /**
     * 网络请求列表数据方法
     * @param current
     * @param pageSize
     */
    pageQueryAllGroup(current, pageSize) {
      this.loading = true
      pageQueryAllGroupNetwork(current, pageSize).then(pageInfo =>{
        let list = pageInfo.list;
        this.groupList = []

        list.forEach(group => {
          group.memberNum = group.memberList.length
          this.groupList.push(group)
        })

        this.total = pageInfo.total
      }).finally(()=>{
        this.loading = false
      })
    }
  },
  mounted() {
    this.pageQueryAllGroup(1, this.pageSize)
  }
}
</script>

<style scoped>
.join-in-group{
  height: 100%;
}
.pagination{
  margin-top: 20px;
}
.scroll-pagination::-webkit-scrollbar{
  display: none;
}
</style>