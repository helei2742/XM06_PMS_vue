<template>
  <el-skeleton v-if="group === null" :rows="15" animated />

<div v-else class="group-detail"  >
  <show-window key="groupDetail" v-loading="loading">
    <div slot="title">
      <i class="el-icon-s-custom"></i>
      <span>小组管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>我加入的小组</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{group.groupName}}</span>
    </div>



    <div slot="main" style="padding: 30px 15px">

      <div v-if="isManager"
           style="text-align: right;margin-bottom: 20px">
        <el-tooltip effect="dark" content="修改小组信息" placement="bottom-end">
          <el-button @click="dialogFormVisible=true"
                     circle
                     icon="el-icon-edit">
          </el-button>
        </el-tooltip>
      </div>


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


  <el-dialog title="小组信息修改"
             v-if="isManager"
             :visible.sync="dialogFormVisible">

    <el-form :model="groupForm" :rules="rules" ref="ruleForm">
      <el-form-item label="小组名" prop="groupName">
        <el-input v-model="groupForm.groupName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="小组描述">
        <el-input  v-model="groupForm.described"
                   type="textarea"
                   :autosize="{ minRows: 2, maxRows: 4}">
        </el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">
        取 消
      </el-button>
      <el-button type="primary"
                 :disabled="isSame"
                 @click="handleAlter">
        确 定
      </el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import {
  queryGroupInvitationCode,
  removeGroupMemberNetwork,
  dissolveGroupNetwork, queryGroupByNameNetwork, alterGroupInfoNetwork
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
    },
    isSame(){
      if(this.groupForm.groupName !== this.group.groupName)
        return false
      if(this.groupForm.described !== this.group.described)
        return false
      return true
    }
  },
  data(){
    return {
      group: null,
      groupForm: {
        groupName: '',
        described: ''
      },
      rules: {
        groupName:[
          { required: true, message: '请输入小组名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      loading: false
    }
  },
  activated() {
    this.reloadPage()
  },
  methods:{
    /**
     * 重载页面方法
     */
    reloadPage(){
      let group = this.$route.query.group
      let groupName = this.$route.query.groupName
      this.loading = true
      this.loadData(group, groupName).finally(()=>this.loading = false)
    },

    /**
     * 加载数据方法，返回promise
     */
    loadData(group,groupName){
      return new Promise(((resolve, reject) => {
        if(group===null||group===undefined||group.groupName === undefined){

          queryGroupByNameNetwork(groupName).then(data=>{
            if(data.code === 200) {
              this.group = this.fixGroup(data.result)
              this.groupForm = JSON.parse(JSON.stringify(data.result))
            }else {
              this.$message.error('加载失败，请稍后重试')
            }
          }).catch(e => reject(e)).finally(()=>resolve())

        }else {
          try{
            this.group = this.fixGroup(group)
            this.groupForm = JSON.parse(JSON.stringify(group))
            resolve()
          } catch{
            reject('解析group信息出错')
          }
        }
      }))
    },
    /**
     * 取消修改小组信息时调用
     */
    handleCancel(){
      this.groupForm.groupName = this.group.groupName
      this.groupForm.described = this.group.described
      this.dialogFormVisible = false
    },
    /**
     * 点击修改小组信息时调用
     */
    handleAlter(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '正在修改小组信息',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          let form = {
            groupId: this.group.id,
            userId: this.$store.getters.getLoginUser.id,
            groupName: this.groupForm.groupName===this.group.groupName?null:this.groupForm.groupName,
            described: this.groupForm.described===this.group.described?null:this.groupForm.described
          }
          alterGroupInfoNetwork(form).then(data=>{
            if(data.code === 200){
              this.$alert('修改小组信息成功,请关闭后重新进入页面', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.handleCancel()
                }
              })
            }else {
              this.$alert('修改失败,'+data.msg)
            }
          }).finally(()=>loading.close())

        } else {
          return false;
        }
      })
    },
    /**
     * 格式化该页的日期显示
     */
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

    /**
     *  获取小组邀请码方法
     */
    getInvitationCode(groupId){
      let managerId = this.$store.getters.getLoginUser.id
      const loading = this.$loading({
        lock: true,
        text: '正在获取小组邀请码',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      queryGroupInvitationCode(groupId, managerId).then(data => {
        console.log(data)
        if(data.code === 200){
          this.$alert(data.result, '小组邀请码', {
            confirmButtonText: '确定'
          })
        }else{
          this.$message.error('出错了', data.msg)
        }
      }).finally(()=> loading.close())
    },

    /**
     *   移除成员方法
     */
    removeMember(userId) {
      let groupId = this.group.id
      let managerId = this.$store.getters.getLoginUser.id

      //弹出确认框
      this.$alert('是否移除该成员', '警告', {
        confirmButtonText: '确定',
        callback: action => {
          const loading = this.$loading({
            lock: true,
            text: '正在移除成员',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          removeGroupMemberNetwork(managerId, groupId, userId).then(data=>{
            console.log(data)
            if(data.code === 200){
              this.$message.success('移除成员'+data.result+'成功')
            }else {
              this.$message.error(data.msg)
            }
          }).finally(()=>{
            loading.close()
            this.reloadPage()
          })
        }
      })
    },

    /**
     *  解散小组方法
     */
    dissolveGroup(){
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'password',
        inputPattern: /^[_0-9a-z]{6,16}$/,
        inputErrorMessage: '密码格式不正确'
      }).then(({ value }) => {
        let groupId = this.group.id
        let managerId = this.$store.getters.getLoginUser.id
        const loading = this.$loading({
          lock: true,
          text: '正在解散小组',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        dissolveGroupNetwork(managerId, groupId,value).then(data=>{
          if(data.code === 200){
            this.$message.success('解散小组'+this.group.groupName+'成功')
          }else{
            this.$message.error('解散小组失败,'+data.msg)
          }
        }).finally(()=>loading.close())
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      })
    }

  }
}
</script>

<style scoped>

</style>