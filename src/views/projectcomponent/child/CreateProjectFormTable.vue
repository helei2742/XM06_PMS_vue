<template>
<div class="create-project-formTable">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="项目名称" prop="projectName">
      <el-input v-model="ruleForm.projectName"></el-input>
    </el-form-item>

    <el-form-item label="是否公开" prop="isPublic">
      <el-switch v-model="ruleForm.isPublic"></el-switch>
    </el-form-item>

    <el-form-item label="负责小组" prop="groups">
      <el-checkbox-group v-model="ruleForm.groups">
        <el-checkbox v-for="group in groupList"
                     :label="group.id" name="type">
                      {{group.groupName}}
        </el-checkbox>
      </el-checkbox-group>

    </el-form-item>

    <el-form-item label="项目描述" prop="desc">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 9 }"  v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

  </el-form>
</div>
</template>

<script>
export default {
  name: "CreateProjectFormTable",
  props: {
    groupList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      ruleForm: {
        projectName: '',
        isPublic: false,
        groups: [],
        desc: ''
      },
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        groups: [
          { type: 'array', required: true, message: '请至少选择一个小组', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写项目详情', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //发出创建项目事件
          this.$emit('createproject', this.ruleForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.create-project-formTable{
  padding: 60px 10px;
}
</style>