<template>
<div class="group-detail" v-if="group !== null" >
  <show-window key="groupDetail">
    <div slot="title">
      <i class="el-icon-s-custom"></i>
      <span>小组管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>我加入的小组</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{group.groupName}}</span>
    </div>

    <div slot="main" style="padding: 30px 15px">

      <el-descriptions :column="1"
                       border
                       :label-style="{'width':'20%',
                       'backgroundColor': cardStyle.backgroundColor,
                       'color':cardStyle.color}"
                       :content-style="cardStyle">
        <template slot="title" >
          <span :style="{'color': cardStyle.color}">小组信息</span>
        </template>
        <template slot="extra">
          <el-button @click="getInvitationCode(group.id)"
                     type="primary"
                     v-if="isManager"
                     round>
            获取小组邀请码
          </el-button>
        </template>
        <el-descriptions-item label="小组名">{{group.groupName}}</el-descriptions-item>
        <el-descriptions-item label="组长用户名">{{group.manager.userName}}</el-descriptions-item>
        <el-descriptions-item label="组长真实姓名">{{group.manager.trueName}}</el-descriptions-item>
        <el-descriptions-item label="创建日期">
          <el-tag size="small">{{formatDate(group.createDate)}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="小组描述" >
          <span style="white-space: pre-line;">{{group.described}}</span>
        </el-descriptions-item>
      </el-descriptions>

      <hr>
      <br/>
      <br/>
      <el-descriptions class="margin-top"
                       :label-style="cardStyle"
                       :content-style="cardStyle"
                       border
                       :column="3" >
        <template slot="title" >
          <span :style="{'color': cardStyle.color}">组长信息</span>
        </template>

        <template slot="extra">
          <el-button @click="dissolveGroup"
                     v-if="isManager"
                     type="danger"
                     size="small">
            解散小组
          </el-button>
        </template>

        <el-descriptions-item label="用户名">{{group.manager.userName}}</el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{group.manager.trueName}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{group.manager.phone}}</el-descriptions-item>
        <el-descriptions-item label="邮箱">
          <el-tag size="small">{{group.manager.email}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建日期">{{formatDate(group.manager.createDate)}}</el-descriptions-item>
      </el-descriptions>

      <hr/>
      <br/>
      <br/>
      <span :style="{'color': cardStyle.color}">成员信息</span>
      <el-descriptions v-for="(user,index) in group.memberList"
                       :label-style="cardStyle"
                       :content-style="cardStyle"
                       :column="3"
                       border>

        <template slot="title">
          <span :style="{'color': cardStyle.color}">成员{{(index+1)}}</span>
        </template>

        <template v-if="isManager" slot="extra">
          <el-button @click="removeMember(user.id)"
                     type="warning"
                     size="small">移除成员</el-button>
        </template>

        <el-descriptions-item label="用户名">{{user.userName}}</el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{user.trueName}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{user.phone}}</el-descriptions-item>
        <el-descriptions-item label="邮箱">
          <el-tag size="small">{{user.email}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建日期">
          {{formatDate(user.createDate)}}
        </el-descriptions-item>
      </el-descriptions>

    </div>
  </show-window>

</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import {
  queryGroupInvitationCode,
  removeGroupMemberNetwork,
  dissolveGroupNetwork, queryGroupByNameNetwork
} from "@/network/group";

export default {
  name: "GroupDetail",
  components: {ShowWindow},
  computed: {
    cardStyle() {
      return  this.$store.getters.getCardColorStyle
    },
    isManager() {
      let userId = this.$store.getters.getLoginUser.id
      return userId === this.group.managerId
    }
  },
  data(){
    return {
      group: null
    }
  },
  activated() {

    let group = this.$route.query.group
    console.log(group)
    if(group.groupName === undefined){
      let groupName = this.$route.query.groupName
      queryGroupByNameNetwork(groupName).then(data=>{
        if(data.code === 200) {
          this.group = this.fixGroup(data.result)
        }else {
          this.$message.error('加载失败，请稍后重试')
        }
      })
    }else {
      this.group = this.fixGroup(group)
    }
  },
  methods:{
    formatDate(time){
      return this.$formatDate(time);
    },
    /**
     * 处理group数据信息
     * @param group
     * @returns {*}
     */
    fixGroup(group) {
      for (let i = 0; i < group.memberList.length; i++) {
        let member = group.memberList[i]
        if(member.id === group.managerId){
          group.manager = member
          group.memberList.splice(i,1)
          break
        }
      }
      return group
    },

    //获取小组邀请码方法
    getInvitationCode(groupId){
      let managerId = this.$store.getters.getLoginUser.id
      queryGroupInvitationCode(groupId, managerId).then(data => {
        console.log(data)
        if(data.code === 200){
          this.$alert(data.result, '小组邀请码', {
            confirmButtonText: '确定'
          })
        }else{
          this.$message.error('出错了', data.msg)
        }
      })
    },

    //移除成员方法
    removeMember(userId) {
      let groupId = this.group.id
      let managerId = this.group.managerId
      //弹出确认框
      this.$alert('是否移除该成员', '警告', {
        confirmButtonText: '确定',
        callback: action => {

          removeGroupMemberNetwork(managerId, groupId, userId).then(data=>{
            console.log(data)
            if(data.code === 200){
              this.$message.success('移除成员'+data.result+'成功')
            }else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    },

    //解散小组方法
    dissolveGroup(){
      this.$confirm('此操作将永久解散小组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let groupId = this.group.id
        let managerId = this.group.managerId
        dissolveGroupNetwork(managerId, groupId).then(data=>{
          console.log(data)
          if(data.code === 200){
            this.$message.success('解散小组'+this.group.groupName+'成功')
          }else{
            this.$message.error('解散小组失败,'+data.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>