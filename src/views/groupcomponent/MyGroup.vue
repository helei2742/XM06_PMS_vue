<template>
<div id="my-group">
    <show-window key="myGroup">
      <div slot="title">
        <i class="el-icon-s-custom"></i>
        <span>小组管理</span>
        <i class="el-icon-arrow-right"></i>
        <span>我管理的小组</span>
      </div>

      <div slot="main" :style="groupListStyle">
        <group-list
            :card-style="groupListStyle"
             :group-list="groupList"
        />

        <el-pagination
            style="margin: 10px 0;text-align: center"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="limit"
            :pager-count="7"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

      </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import GroupList from "@/views/groupcomponent/mygroupChild/GroupList"

import {queryManagedGroupNetwork} from "@/network/group";

export default {
  name: "MyGroup",
  components: {
    ShowWindow,
    GroupList
  },
  computed: {
    groupListStyle() {
      return this.$store.getters.getCardColorStyle
    }
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      pages: 1,
      limit: 5,
      groupList: []
    }
  },
  methods: {
    /**
     * 网络请求方法，请求管理的小组列表信息
     * @param currentPage
     * @param limit
     */
    queryGroupByManagerId(currentPage, limit){
      let id = this.$store.getters.getLoginUser.id
      queryManagedGroupNetwork(id, currentPage, limit).then(data=>{
        console.log(data)
        if(data.code === 200){
          let pageInfo = data.result
          this.groupList = pageInfo.list

          for (let group of this.groupList) {
            group.memberNum = group.memberList.length
            // group.createDate = this.$formatDate(group.createDate)
          }

          this.total = pageInfo.total
        }else{
          this.$message.error('出错了'+data.msg)
        }
      })
    },
    handleCurrentChange(index){
      this.queryGroupByManagerId(index, this.limit)
    }
  },
  mounted() {

    this.queryGroupByManagerId(this.currentPage, this.limit)
  }
}
</script>

<style scoped>
#my-group{
  width: 100%;
  height: 100%;
}
</style>