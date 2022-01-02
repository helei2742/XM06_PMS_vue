<template>
<div class="alter-user-info-page">
  <show-window @loading="loading">
    <div slot="title">
      <i class="el-icon-user"></i>
      用户管理
      <i class="el-icon-arrow-right"></i>
      修改信息
    </div>

    <div slot="main">
      <div style="text-align: right;padding:20px">
        <el-button type="danger"
                   size="mini"
                   round
                   @click="dropUser"
                   icon="el-icon-lock">
          注销账户
        </el-button>
      </div>

      <alter-user-info-form ref="alterUserInfoForm"
                            @alterUserInfo="alterUserInfo"
                            :user-info="$store.getters.getLoginUser"/>

    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import AlterUserInfoForm from "@/views/usercomponent/userchildcomponent/AlterUserInfoForm";
import {alterUserInfoNetwork, dropUserNetwork} from "@/network/user";
import {LOGOUT} from "@/store/mutations-types";
export default {
  name: "AlterUserInfoPage",
  components: {AlterUserInfoForm, ShowWindow},
  data(){
    return {
      loading: false
    }
  },
  methods:{
    alterUserInfo(user){
      console.log(user)
      this.loading=true

      alterUserInfoNetwork(user).then(data=>{
        console.log(data)
        if(data.code === 200){
          this.$message.success('修改信息成功')
        }else{
          this.$alert('修改信息失败'+data.msg)
        }
      }).finally(()=>{
        this.loading = false
      })
    },
    dropUser(){
      this.$prompt('请输入账号密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'password',
        inputPattern: /^[_0-9a-z]{6,16}$/,
        inputErrorMessage: '密码格式不正确'
      }).then(({ value }) => {
        console.log(value)
        let userId = this.$store.getters.getLoginUser.id
        dropUserNetwork(userId, value).then(data=>{
          if(data.code === 200){
            this.$alert('已注销,返回登录界面')
            this.$store.commit(LOGOUT)
            this.$router.push('/login')
          }else{
            this.$alert('注销失败'+data.msg)
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消注销'
        });
      })
    }
  },
  activated() {
    this.$refs.alterUserInfoForm.setAlterUserInfo(this.$store.getters.getLoginUser)
  }
}
</script>

<style scoped>

</style>