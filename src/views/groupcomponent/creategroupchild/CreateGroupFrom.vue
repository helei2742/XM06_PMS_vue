<template>
<div class="create-group-from" :style="cardStyle">

  <el-row>
    <el-col :offset="2" :span="12">

      <el-form :model="form" :rules="rules" ref="createForm">
        <el-form-item label="小组名" label-width="100px" prop="groupName">
          <el-input v-model="form.groupName"></el-input>
        </el-form-item>

        <el-form-item label-width="100px" label="小组描述">
          <el-input  v-model="form.described"
                     type="textarea"
                     :autosize="{ minRows: 2, maxRows: 4}">
          </el-input>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>

  <el-row>
    <el-col :offset="4" :span="10">
      <el-button @click="createGroup"
                 style="width: 100%;margin-top:20px"
                 type="primary"
      >
        创建
      </el-button>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "CreateGroupFrom",
  props: {
    cardStyle: {
      type: Object,
      default() {
        return {backgroundColor: '#b6baba',
                color: '#202020'}
      }
    }
  },
  data(){
    return {
      form: {
        groupName: null,
        described: null
      },
      rules: {
        groupName:[
          { required: true, message: '请输入小组名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    createGroup() {
      this.$refs['createForm'].validate((valid) => {
        if (valid) {
          this.$emit('creategroup',this.form)
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>
.create-group-from{
  padding: 30px 20px 50px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

</style>