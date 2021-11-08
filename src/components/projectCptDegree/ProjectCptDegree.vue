<template>
<div class="project-detail-card-cpt-degree" v-if="project != null">
  <div style="display: inline-block">
    <el-progress type="circle"
                 :width="200"
                 :color="getDegreeColor(project.completionDegree)"
                 :percentage="project.completionDegree">
    </el-progress>
    <div class="submit-degree-btn">
      <el-button size="mini" icon="el-icon-minus"></el-button>
      <el-input  size="mini" :value="submitDegree" style="width:60px"></el-input>
      <el-button size="mini" icon="el-icon-plus"></el-button>
    </div>
  </div>
  <div class="project-detail-card-cpt-textarea" >
    <h5 >当前项目进度</h5>
    <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 6}"
        resize="none"
        placeholder="提交的描述信息"
        v-model="submitDesc">
    </el-input>
  </div>
  <div style="border: 1px solid red; padding: 20px; margin: 15px">
    <file-upload-model/>
  </div>
  <el-button style="display: block;margin: 0 auto">
    更新项目进度
  </el-button>
</div>
</template>

<script>
import FileUploadModel from "@/components/projectCptDegree/FileUploadModel";
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
      submitDegree: 100
    }
  },
  methods: {
    getDegreeColor(degree) {
      if (degree < 30) {
        return '#ff0000'
      } else if (degree < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
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