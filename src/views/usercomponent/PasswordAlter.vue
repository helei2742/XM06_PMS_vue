<template>
  <div>
    <show-window key="passwordAlter">
      <div slot="title">
        <i class="el-icon-user"></i>
        用户管理
        <i class="el-icon-arrow-right"></i>
        修改密码
      </div>
      <div slot="main" style="padding: 50px 0">
        <el-row>
          <el-col ::offset="1" :xs="22" :sm="18" :md="18" :lg="10" :xl="10">
            <password-alter-from
                @alterpassword="alterPassword"
            />
          </el-col>
        </el-row>
      </div>
    </show-window>
  </div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import PasswordAlterFrom from "@/views/usercomponent/userchildcomponent/PasswordAlterFrom";
import {LOGOUT} from "@/store/mutations-types";

import {alterPwdNetwork} from "@/network/user";

export default {
  name: "PasswordAlter",
  components: {
    PasswordAlterFrom,
    ShowWindow
  },
  methods: {

    /**
     * 修改密码调用方法
     * @param from
     */
    alterPassword(from) {
      from.id = this.$store.getters.getLoginUser.id
      console.log(from)
      alterPwdNetwork(from).then(data => {
        console.log(data)
        if(data.code === 200){
          this.$store.commit(LOGOUT)

          this.$message({
            type: 'success',
            message: '修改成功,2秒后跳入登录页面'
          })

          setTimeout(()=>{
            this.$router.push('/login')
          }, 2000)

        }else{
          this.$message({
            type: 'error',
            message: '出错了, '+data.msg
          })
        }
      })
    }

  }
}
</script>

<style scoped>

</style>