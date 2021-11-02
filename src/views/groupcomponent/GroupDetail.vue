<template>
<div class="group-detail" v-if="group !=null">
  <show-window>
    <div slot="title">
      <i class="el-icon-s-custom"></i>
      <span>小组管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>我加入的小组</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{group.groupName}}</span>
    </div>
    <div slot="main">

      <el-descriptions :column="1" title="小组信息">

        <template slot="extra">
          <el-button @click="getInvitationCode(group.id)" type="primary" round>获取小组邀请码</el-button>
        </template>
        <el-descriptions-item label="小组名">{{group.groupName}}</el-descriptions-item>
        <el-descriptions-item label="组长用户名">{{group.manager.user_name}}</el-descriptions-item>
        <el-descriptions-item label="组长真实姓名">{{group.manager.true_name}}</el-descriptions-item>
        <el-descriptions-item label="创建日期">
          <el-tag size="small">{{group.createDate}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="小组描述">{{group.described}}</el-descriptions-item>
      </el-descriptions>

      <hr>
      <br/>
      <br/>
      <el-descriptions class="margin-top" title="组长信息" :column="3" >

        <template slot="extra">
          <el-button @click="dissolveGroup" type="danger" size="small">解散小组</el-button>
        </template>

        <el-descriptions-item label="用户名">{{group.manager.user_name}}</el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{group.manager.true_name}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{group.manager.phone}}</el-descriptions-item>
        <el-descriptions-item label="邮箱">
          <el-tag size="small">{{group.manager.email}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建日期">{{group.manager.create_date}}</el-descriptions-item>
      </el-descriptions>

      <hr/>
      <br/>
      <br/>
      <span>成员信息</span>
      <el-descriptions v-for="(user,index) in group.memberList"
                       :title="'成员'+(index+1)"
                        :column="3" border>
        <template slot="extra">
          <el-button @click="removeMember(user.id)" type="warning" size="small">移除成员</el-button>
        </template>
        <el-descriptions-item label="用户名">{{user.user_name}}</el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{user.true_name}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{user.phone}}</el-descriptions-item>
        <el-descriptions-item label="邮箱">
          <el-tag size="small">{{user.email}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建日期">{{user.create_date}}</el-descriptions-item>
      </el-descriptions>

    </div>
  </show-window>

</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import {queryGroupInvitationCode,
  removeGroupMemberNetwork,
  dissolveGroupNetwork} from "@/network/group";

export default {
  name: "GroupDetail",
  components: {ShowWindow},
  data(){
    return {
      group: null
    }
  },
  mounted() {
    //处理数据
    let group = this.$route.query.group
    for (let i = 0; i < group.memberList.length; i++) {
      let member = group.memberList[i]
      member.create_date = this.$formatDate(member.create_date)
      if(member.id === group.managerId){
        group.manager = member
        group.memberList.splice(i-1,1)
      }
    }
    this.group = group
  },
  methods:{
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
      this.$alert('是否解散该小组', '警告', {
        confirmButtonText: '确定',
        callback: action => {
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
        }
      })
    }
  }
}
</script>

<style scoped>

</style>