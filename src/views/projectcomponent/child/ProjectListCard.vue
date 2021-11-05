<template>
<div class="project-list-card"  >
  <div class="project-list-card-item" v-for="project in projectList">
  <el-card
           shadow="hover"
           :body-style="cardStyle"
           class="box-card">
    <div slot="header" class="clearfix"
         :style="cardStyle"
         style="padding: 20px 10px">
      <span class="project-title">{{project.projectName}}</span>

      <el-button style="float: right; padding: 3px 0" type="text"
                 @click="toProjectDetail(project)">
        查看详情
      </el-button>
    </div>

    <div :style="cardStyle">
      <el-descriptions title="" border
                       :column="1"
                       :label-style="cardStyle"
                       :content-style="cardStyle">
        <el-descriptions-item label="项目描述">
          <span :style="{'whiteSpace': 'pre-line'}">
            {{project.projectDesc}}
          </span>
        </el-descriptions-item>

        <el-descriptions-item label="创建日期">
          {{formatDate(project.createDate)}}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div style="margin-top: 20px">
      项目完成度：
      <el-progress :percentage="project.completionDegree"
                   :color="customColorMethod"></el-progress>
    </div>
  </el-card>
  </div>
</div>
</template>

<script>
export default {
  name: "ProjectListCard",
  props: {
    projectList: {
      type: Array,
      default: []
    },
    cardStyle: {
      type: Object,
      default: {
        backgroundColor: '#b6baba',
        color: '#202020'
      }
    }
  },
  computed: {
    formatDate(){
      return (time) => {
        return this.$formatDate(time)
      }
    }
  },
  methods: {
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#ff0000'
      } else if (percentage < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    },
    toProjectDetail(project) {
      console.log(project)
      this.$router.push({
        path: '/index/projectdetail',
        query: {
          project: project
        }
      })
    }
  }
}
</script>

<style scoped>

.project-list-card{
  padding-top: 10px;

}
.project-list-card-item{
  margin-bottom: 30px;
}
.project-title{
  font-size: 22px;
  font-weight: bold;

}
.box-card{
  margin: 15px 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>