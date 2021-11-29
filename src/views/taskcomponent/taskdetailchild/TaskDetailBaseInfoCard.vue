<template>
<div class="task-detail-base-info-card"
     :style="$store.getters.getCardColorStyle"
     v-if="task.creator.id!== undefined">
  <button class="btn" @click="changeShowInfo">
    <i class="el-icon-refresh-left"></i>
  </button>

  <el-carousel ref="slideShow"
               height="500px"
               indicator-position="none"
               direction="vertical"
               :autoplay="false">
    <el-carousel-item>
      <el-descriptions title="任务信息" :colon="false" :column="1">
        <el-descriptions-item label="任务名称">{{task.taskName}}</el-descriptions-item>
        <el-descriptions-item label="发布时间">
          <el-tag>
            {{formatDate(task.createDate)}}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="截至时间">
          <el-tag>
            {{formatDate(task.deadline)}}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="任务要求">
          <span class="description" >
            {{task.description}}
          </span>
        </el-descriptions-item>
      </el-descriptions>

    </el-carousel-item>
    <el-carousel-item>
      <el-descriptions title="发布人信息" :column="1">
        <el-descriptions-item label="用户名">{{task.creator.userName}}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{task.creator.trueName}}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{task.creator.email}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{task.creator.phone}}</el-descriptions-item>
      </el-descriptions>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
export default {
  name: "TaskDetailBaseInfoCard",
  props:{
    task: {
      type: Object,
      default(){
        return null
      }
    }
  },
  methods: {
    formatDate(time){
      return this.$formatDate(time)
    },
    changeShowInfo(){
      this.$refs.slideShow.next()
    }
  }

}
</script>

<style scoped>
.task-detail-base-info-card{
  position: relative;
  width: 260px;
  padding: 15px 20px;
  margin: 0 auto;
  border-radius: 12px;

}
.task-detail-base-info-card .description{
  display: inline-block;
  white-space: pre-wrap;
  width: 180px;
  min-height: 330px;
}
.task-detail-base-info-card>button{
  position: absolute;
  padding: 1px;
  right: 15px;
  font-size: 32px;
  z-index: 100;
  border: none;
  background-color: transparent;
}
.task-detail-base-info-card>button:hover{
  cursor: pointer;
  color: #45c436;
}
.task-detail-base-info-card>button:focus{
  color: #17f9ee;
}
</style>