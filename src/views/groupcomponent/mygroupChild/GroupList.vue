<template>
<div class="my-group-list" >
<!-- 组队列表   -->
  <el-table
        :row-style="cardStyle"
        :header-cell-style="cardStyle"
        :data="groupList"
        height="372"
        style="width: 700px">

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
        <template slot-scope="scope">
          {{formatDate(scope.row.createDate)}}
        </template>
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
    },
    cardStyle: {
      type: Object,
      default() {
        return {
          backgroundColor: '#b6baba',
          color: '#202020'
        }
      }
    }
  },
  methods: {
    detail(group){
      console.log(group)
      this.$router.push({
        path: '/index/groupdetail',
        query: {
          group: group,
          groupName: group.groupName
        }
      })
    },
    formatDate(time) {
      return this.$formatDate(time)
    }
  }
}
</script>

<style scoped>
.my-group-list{
  margin: 40px auto 5px;
  width: 700px;
  border-radius: 6px;
}
</style>