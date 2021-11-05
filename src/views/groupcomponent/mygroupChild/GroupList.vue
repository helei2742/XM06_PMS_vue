<template>
<div class="my-group-list" >
<!-- 组队列表   -->
  <el-table
        :row-style="cardStyle"
        :data="groupList"
        :header-cell-style="cardStyle"
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
          group: group
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
  padding: 20px 10px 0 20px;
}
</style>