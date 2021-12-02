<template>
<div class="joinin-group-list" :style="cardStyle">
<!-- 组队列表   -->
  <el-table
        :data="groupList"
        :header-cell-style="cardStyle"
        :row-style="cardStyle"
        height="400"
        style="width: 100%;background-color:transparent;">

      <el-table-column
          prop="groupName"
          label="小组名"
          width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>管理员用户名: {{ managerName(scope.row.managerId, scope.row.memberList)}}</p>
            <p>队伍描述: {{ scope.row.described}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.groupName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
          prop="memberNum"
          label="成员数"
          sortable
          width="95">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="创建日期"
          sortable
          width="240">
        <template slot-scope="scope">
          {{formatDate(scope.row.createDate)}}
        </template>
      </el-table-column>

    <el-table-column width="200">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              style="width: 100px"
              placeholder="输入小组名"/>
          <el-button size="mini" @click="searchGroupName">搜索</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="success" @click="add(scope.row.id)">加入</el-button>
          <el-button type="info" @click="groupDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>


<!-- 点击加入弹出的确认框 -->
  <el-dialog title="请输入小组邀请码" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="邀请码" label-width="120px">
        <el-input v-model="form.invitationCode" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="invitationCodeSubmit">确 定</el-button>
    </div>
  </el-dialog>

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
  data() {
    return {
      form: {
        invitationCode: '',
        groupId: null
      },
      dialogFormVisible: false,
      search: '',
    }
  },
  computed:{
    managerName(){
      return function (id, memberList) {
        for(let i = 0; i < memberList.length; i++ ){
          if(id === memberList[i].id)
            return memberList[i].userName
        }
        return ''
      }
    }
  },
  methods: {
    add(id){
      this.form.groupId = id
      this.dialogFormVisible = true
    },
    groupDetail(group){
      this.$router.push({
        path: '/index/groupdetail',
        query: {
          group: group,
          groupName: group.groupName
        }
      })
    },
    invitationCodeSubmit() {
      this.$emit('joiningroup', this.form)
      this.dialogFormVisible = false
    },
    searchGroupName() {
      this.$emit('searchgroupname', this.search)
    },
    formatDate(time) {
      return this.$formatDate(time)
    }
  }
}
</script>

<style scoped>
.joinin-group-list{
  padding: 30px 10px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  position: relative;
  width: 50%;
}
.demo-table-expand .el-form-item div[class='described']{
  width: 400px;

  text-indent: 2em;
  line-height: 20px;
  overflow: hidden;
  float: left;
  position: relative;
  word-break: break-all;
}
</style>