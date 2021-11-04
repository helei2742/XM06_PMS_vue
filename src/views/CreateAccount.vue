<template>
  <div class="create-account">
    <el-row type="flex" justify="space-around">
      <el-col :xs="20" :sm="16" :md="12" :lg="10" :xl="12">
        <div class="title">注册管理系统账户</div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :xs="20" :sm="16" :md="12" :lg="10" :xl="12">
        <create-account-from @createaccount="createAccount"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import CreateAccountFrom from "@/components/createaccountfrom/CreateAccountFrom";
import {createAccount} from "@/network/user";

export default {
  name: "CreateAccount",
  components:{
    CreateAccountFrom,
  },
  data(){
    return {
      logoUrl: require('@/assets/logo.png')
    }
  },
  methods: {
    createAccount(user) {
      console.log(user)
      createAccount(user).then((data) => {
        console.log(data)
        if(data.code === 200){
          this.$message.success('注册成功，请前往邮箱确认')

          setTimeout(()=>{
            this.$router.push('/login')
          }, 2000)
        }else{
          this.$message.error('注册失败，'+data.msg)
        }

      }).catch(e =>{
        this.$message.error('注册失败，请稍后重试')
      })
    }

  }
}
</script>

<style scoped>
.create-account{
  background-color: #fff;
  height: 100vh;
}
.title{
  font-size: 30px;
  font-weight: 900;
  text-align: center;
  padding: 70px 0 20px;
}
</style>