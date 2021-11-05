<template>

<!--
  加入的小组
-->
<div class="join-in-group">
    <show-window key="joininGroup">
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
          <el-button type="primary" >导出列表</el-button>
        </el-col>
        </el-row>

      </div>
    </show-window>

</div>

</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import GroupList from "@/views/groupcomponent/joiningroupchild/GroupList";

import {joinInGroupNetwork, pageQueryAllGroupNetwork, queryGroupByNameNetwork} from "@/network/group";



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
      isShowPagination: true
    }
  },
  methods: {
    /**
     * 根据输入的组名查找组
     */
    searchByGroupName(groupName){
      queryGroupByNameNetwork(groupName).then(data => {
        console.log(data)

        if(data.code === 200){
          this.groupList = [data.result]
          this.groupList[0].memberNum = this.groupList[0].memberList.length
          this.groupList[0].createDate = this.$formatDate(this.groupList[0].createDate)
          this.isShowPagination = false
          this.$message.success({
            message: '查询成功'
          })

        }else {
          this.$message.error({
            message: '出错了' + data.msg
          })
        }
      })
    },

    /**
     * 加入小组方法， from中属性需含有
     *  userId           用户id
     *  groupId          小组id
     *  invitationCode  邀请码
     */
    joinInGroup(from) {
      console.log(from)
      from.userId = this.$store.getters.getLoginUser.id
      joinInGroupNetwork(from).then(data => {
        console.log(data)
        if(data.code === 200){
           this.$message.success('加入小组成功')
        }else{
          this.$message.error('加入失败,',data.msg)
        }
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
      pageQueryAllGroupNetwork(current, pageSize).then(pageInfo =>{
        let list = pageInfo.list;
        console.log(pageInfo)
        this.groupList = []
        list.forEach(group => {
          group.memberNum = group.memberList.length
          this.groupList.push(group)
        });
        this.total = pageInfo.total
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
</style>