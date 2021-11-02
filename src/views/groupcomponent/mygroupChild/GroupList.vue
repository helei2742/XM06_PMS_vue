<template>
<div id="groupList" >
<!-- 组队列表   -->
  <el-table
        :data="groupList"
        stripe
        border
        height="400"
        style="width: 100%">

      <el-table-column
          prop="groupName"
          label="小组名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="memberNum"
          label="成员数"
          width="180">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="创建日期"
          width="240">
      </el-table-column>

      <el-table-column width="200">
          <template slot-scope="scope">
            <el-button  @click="detail(scope.row)">详情</el-button>
          </template>
      </el-table-column>

    </el-table>

</div>
</template>

<script>
export default {
  name: "GroupList",
  props: {
    groupList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    detail(group){
      console.log(group)
      this.$router.push({
        path: '/index/groupdetail',
        query: {
          group: group
        }
      })
    }
  }
}
</script>

<style scoped>

</style>