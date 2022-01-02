<template>
<div class="alter-user-info-form">
  <el-form ref="createForm" :model="form" :rules="rules" label-position="top">

    <el-row class="create-account-from-item">
      <el-col :offset="2" :span="20">
        <el-form-item label="请输入6到14位用户名" prop="userName">
          <el-input v-model="form.userName"
                    style="width: 70%"
                    :disabled="disabledItem.userName"
                    placeholder="请输入用户名">
          </el-input>
          <el-button @click="disabledItem.userName=!disabledItem.userName"
                     type="danger"
                     icon="el-icon-edit"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row class="create-account-from-item">
      <el-col :offset="2" :span="20">
        <el-form-item label="请输入手机号" prop="phone">
          <el-input v-model="form.phone"
                    style="width: 70%"
                    :disabled="disabledItem.phone"
                    placeholder="请输入手机号">
          </el-input>
          <el-button @click="disabledItem.phone=!disabledItem.phone"
                     type="danger"
                     icon="el-icon-edit"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row class="create-account-from-item">
      <el-col :offset="2" :span="20">
        <el-form-item label="请输入真实姓名" prop="trueName">
          <el-input v-model="form.trueName"
                    style="width: 70%"
                    :disabled="disabledItem.trueName"
                    placeholder="请输入真实姓名">
          </el-input>
          <el-button @click="disabledItem.trueName=!disabledItem.trueName"
                     type="danger"
                     icon="el-icon-edit"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row class="create-account-from-item">
      <el-col :offset="2" :span="20">
        <el-button @click="alterUserInfo"
                   :disabled="isSame"
                   style="width: 100%"
                   type="primary">修改账户
        </el-button>
      </el-col>
    </el-row>

  </el-form>
</div>
</template>

<script>
export default {
  name: "AlterUserInfoForm",
  props:{
    userInfo:{
      type: Object,
      default(){
        return null
      }
    }
  },
  computed:{
    isSame(){
      if(this.form.userName!==this.userInfo.userName) return false
      if(this.form.trueName!==this.userInfo.trueName) return false
      if(this.form.phone !== this.userInfo.phone) return false
      return true
    }
  },
  data(){
    return {
      form:{
        userName: '',
        phone: '',
        trueName: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
        ],
        trueName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        // phone: [
        //   {type: 'number',
        //     pattern: '/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/',
        //     required: true,
        //     message: '请输入正确号码',
        //     trigger: 'blur'
        //   },
        // ],
      },
      disabledItem: {
        userName: true,
        phone: true,
        trueName: true
      }
    }
  },
  methods:{
    alterUserInfo(){
      this.$refs['createForm'].validate((valid) => {
        if (valid) {
          let user = {
            id: this.userInfo.id,
            userName: this.form.userName===this.userInfo.userName?null:this.form.userName,
            phone: this.form.phone===this.userInfo.phone?null:this.form.phone,
            trueName: this.form.trueName===this.userInfo.trueName?null:this.form.trueName
          }
          this.$emit('alterUserInfo', user)
        } else {
          return false;
        }
      })
    },
    setAlterUserInfo(user){
      console.log(user)
      this.form = JSON.parse(JSON.stringify(user))
    }
  }
}
</script>

<style scoped>
.alter-user-info-form{
  max-width: 760px;
  padding: 45px 30px;
  margin: 0 auto;
}
</style>