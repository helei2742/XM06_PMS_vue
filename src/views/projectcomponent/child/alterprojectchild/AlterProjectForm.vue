<template>
<div class="alter-project-form" v-if="project!=null">
  <el-form ref="form" :model="alterForm" :rules="rules" label-width="80px" size="mini">
    <el-form-item label="项目名称" prop="projectName">
      <el-input v-model="alterForm.projectName"
                style="width: 70%"
                :disabled="disabledItem.name">
      </el-input>
      <el-button @click="disabledItem.name=!disabledItem.name"
                 type="danger"
                 icon="el-icon-edit"/>
    </el-form-item>
    <el-form-item label="是否公开">
      <el-switch v-model="alterForm.isPublic"
                 :disabled="disabledItem.isPublic">
      </el-switch>
      <el-button @click="disabledItem.isPublic=!disabledItem.isPublic"
                 type="danger"
                 icon="el-icon-edit"/>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-col :span="11">
        <el-date-picker type="date"
                        :disabled="true"
                        v-model="alterForm.createDate"
                        style="width: 100%;">
        </el-date-picker>
      </el-col>
    </el-form-item>

    <el-form-item label="负责小组">
      <el-transfer v-model="selectGroups"
                   filterable
                   filter-placeholder="输入组名进行搜索"
                   target-order="push"
                   :button-texts="['移除', '添加']"
                   :titles="['尚未加入的小组', '已加入的小组']"
                   :data="allGroups"></el-transfer>
    </el-form-item>

    <el-form-item label="项目描述" prop="projectDesc">
      <el-input type="textarea"
                style="width: 70%"
                :autosize="{ minRows: 2, maxRows: 9 }"
                :disabled="disabledItem.desc"
                v-model="alterForm.projectDesc"/>

      <el-button @click="disabledItem.desc=!disabledItem.desc"
                 type="danger"
                 icon="el-icon-edit"/>
    </el-form-item>
    <el-form-item size="large">
      <el-button type="primary"
                  :disabled="isEqual"
                 @click="onSubmit">
        立即修改
      </el-button>
      <el-button @click="setAlterForm(project, myGroups)"
                 :disabled="isEqual">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>

export default {
  name: "AlterProjectForm",
  props: {
    project:{  //传入项目
      type: Object,
      default(){
        return null
      }
    },
    myGroups: { //传入我的小组
      type: Array,
      default(){
        return null
      }
    }
  },
  data(){
    return {
      alterForm: {},
      disabledItem: {
        name: true,
        isPublic: true,
        desc: true
      },
      selectGroups:[],
      allGroups: [],
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        projectDesc: [
          { required: true, message: '请填写项目详情', trigger: 'blur' }
        ]
      }
    }
  },
  computed:{
    isEqual(){
      //项目信息不同
      if(this.project.projectName !== this.alterForm.projectName)
        return false
      if(this.project.isPublic !== this.alterForm.isPublic)
        return false
      if(this.project.projectDesc !== this.alterForm.projectDesc)
        return false
      //项目小组不同
      let groupList = this.project.groupList
      if(this.selectGroups.length !== groupList.length){
        return false
      }else {
        this.selectGroups.sort((g1,g2)=>{return g1 -g2})

        groupList.sort((g1, g2)=>{return g1.id - g2.id})

        for (let i = 0; i < this.selectGroups.length; i++) {
          if(this.selectGroups[i] !== groupList[i].id)
            return false
        }
      }
      return true
    }
  },
  methods:{
    /**
     * 初始化表单中的数据，包括项目的信息和 小组的信息，
     * 父组件获取项目信息和 用户管理的小组后，需调用该方法
     *  （同时还需要props传值）
     * @param p       项目对象
     * @param groups  管理的小组
     */
    setAlterForm(p, groups){
      this.selectGroups = []
      this.allGroups = []
      this.alterForm = JSON.parse(JSON.stringify(p))

      for (let group of groups) {
        this.allGroups.push({
          key: group.id,
          label: group.groupName
        })
      }
      let groupList = this.alterForm.groupList
      for (let g of groupList) {
        this.selectGroups.push(g.id)
      }
    },
    onSubmit(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          let form = {
            projectId: this.project.id,
            creatorId: this.$store.getters.getLoginUser.id,
            projectName: this.alterForm.projectName!==this.project.projectName
                ?this.alterForm.projectName:null,
            projectDesc: this.alterForm.projectDesc!==this.project.projectDesc
                ?this.alterForm.projectDesc:null,
            isPublic: this.alterForm.isPublic!==this.project.isPublic
                ?this.alterForm.isPublic:null,
            groupIds: this.selectGroups
          }
          this.$emit('alterProject', form)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>