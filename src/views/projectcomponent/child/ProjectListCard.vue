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
      <div style="float: right;margin-left: 10px;">
        <el-dropdown>
          <span class="el-dropdown-link" >
            <el-button icon="el-icon-setting"
                       class="setting-button">
            </el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >
              <span @click="toAlterProject(project)">
                修改项目信息
              </span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="deleteProject(project)" style="color: #ff0000">删除项目</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

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

        <el-descriptions-item label="参与小组">
          <el-dropdown>
            <el-button type="primary">
              鼠标悬浮查看<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="group in project.groupList" >
                <span @click="toGroupDetail(group)">{{ group.groupName }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div style="margin-top: 20px">
      项目完成度：
      <el-progress :percentage="Math.floor(project.completionDegree * 100)"
                   :color="customColorMethod(project.completionDegree * 100)">npm run s
      </el-progress>
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
    /**
     * 点击查看项目详情按钮调用
     * @param project
     */
    toProjectDetail(project) {
      console.log(project)
      this.$router.push({
        path: '/index/projectdetail',
        query: {
          project: project,
          projectId: project.id
        }
      })
    },
    toAlterProject(project){
      this.$router.push({
        path: '/index/alterproject',
        query: {
          project: project,
          projectId: project.id
        }
      })
    },
    /**
     * 点击悬浮查看中的小组按钮调用
     */
    toGroupDetail(group) {
      this.$router.push({
        path: '/index/groupdetail',
        query: {
          group: group,
          groupName: group.groupName
        }
      })
    },
    deleteProject(project){
      this.$emit('deleteProject', project)
    },
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

.setting-button{
  font-size: 25px;padding: 0;border: none;background-color:transparent;
}
</style>