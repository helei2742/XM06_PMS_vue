<template>
<div class="project-detail-card-cpt-degree" v-if="project != null">
  <div style="display: inline-block">
    <el-progress type="circle"
                 :width="200"
                 :color="getDegreeColor(project.completionDegree*100)"
                 :percentage="Math.floor(project.completionDegree*100)">
    </el-progress>

    <div class="submit-degree-btn">
      <el-input-number  size="mini"
                        v-model="submitDegree"
                        :precision="2"
                        :max="1"
                        :min="0"
                        step-strictly
                        :step="0.01"
                        ></el-input-number>
    </div>

  </div>
  <div class="project-detail-card-cpt-textarea" >
    <h5 >当前项目进度:{{Math.floor(project.completionDegree*100)}}%</h5>
    <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 6}"
        resize="none"
        placeholder="提交的描述信息"
        v-model="submitDesc">
    </el-input>
  </div>

  <div style="padding: 20px; margin: 15px">
    <file-upload-model ref="fileUpload"/>
  </div>

  <el-button @click="updateProject" style="display: block;margin: 0 auto">
    更新项目进度
  </el-button>
</div>
</template>

<script>
import FileUploadModel from "@/views/projectcomponent/child/projectCptDegree/FileUploadModel";
import {updateProjectDegreeNetwork} from "@/network/project";
export default {
  name: "ProjectCptDegree",
  components: {FileUploadModel},
  props: {
    project: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      submitDesc: '',
      submitDegree: 0,
      progressPercent: 0
    }
  },
  methods: {
    handleDegreeMinus(){
      this.submitDegree--
    },
    handleDegreePlus(){
      this.submitDegree++
    },
    getDegreeColor(degree) {
      if (degree < 30) {
        return '#ff0000'
      } else if (degree < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    },
    updateProject(){

      this.$confirm('确定更新项目进度?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.updateProjectDegree()

      }).catch((e) => {
        console.log(e)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updateProjectDegree(){
      let form = this.$refs.fileUpload.fileForm
      if(form == null) form = new FormData()

      let userId = this.$store.getters.getLoginUser.id
      form.append('userId', userId)
      form.append('projectId', this.project.id)
      form.append('submitDesc', this.submitDesc)
      form.append('submitDegree', this.submitDegree)

      const uploadProgressEvent = progressEvent => {
        this.progressPercent = (progressEvent.loaded / progressEvent.total * 100 | 0)
      }

      updateProjectDegreeNetwork(form, uploadProgressEvent).then(data => {
        console.log(data)
        if(data.code === 200) {
          this.$message.success('更新项目进度成功')
        }else {
          this.$message.error('更新项目进度失败,'+ data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

.submit-degree-btn{
  padding-top: 10px;
  padding-left:28px;
}

.project-detail-card-cpt-degree{
  position: relative;
  padding: 20px 20px;
  margin: 10px;
  min-height: 300px;
  border: 1px solid rgba(100,100,100,0.2);
  box-shadow: 1px 1px 4px rgba(100,100,100,0.2);
}
.project-detail-card-cpt-textarea{
  font-size: 21px;
  display: inline-block;
  margin-left: 20px;
  width: 60%;
}
</style>