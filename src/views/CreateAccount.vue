<template>
  <div class="create-account" :style="bgStyle">
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
import {REGISTBACKGROUND} from "@/util/imageUrl";

export default {
  name: "CreateAccount",
  components:{
    CreateAccountFrom,
  },
  data(){
    return {
      bgStyle: REGISTBACKGROUND,
      logoUrl: require('@/assets/img/logo.png')
    }
  },
  methods: {
    createAccount(user) {
      const loading = this.$loading({
        lock: true,
        text: '正在创建用户',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      createAccount(user).then((data) => {
        if(data.code === 200){
          this.$message.success('注册成功，请前往邮箱确认')

          setTimeout(()=>{
            this.$router.push('/login')
          }, 2000)
        }else{
          // this.$message.error('注册失败，'+data.msg)
          this.$message.error('注册失败，可能是幽幽子把数据吃了（bushi)'+data.msg)
        }

      }).catch(e =>{
        this.$message.error('注册失败，请稍后重试')
      }).finally(()=>{
        loading.close()
      })
    }

  }
}
</script>

<style scoped>
.create-account{
  background-color: #fff;
  height: 100vh;
  padding: 0 0 50px;
}
.title{
  font-size: 30px;
  font-weight: 900;
  text-align: center;
  padding: 70px 0 20px;
}
</style>