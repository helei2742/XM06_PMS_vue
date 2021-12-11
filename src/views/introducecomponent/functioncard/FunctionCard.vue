<template>
<div class="function-card">
    <div class="main">
      <function-card-item v-for="info in dataList"
                          :bgc="info.bgc"
                          :title="info.title"
                          :description="info.description"/>

    </div>
</div>
</template>

<script>
import FunctionCardItem from "@/views/introducecomponent/functioncard/FunctionCardItem";
export default {
  name: "FunctionCard",
  components: {FunctionCardItem},
  data() {
    return{
      dataList: [
        {title:'用户管理',description:'安全的邮箱验证，创建即可使用本系统',bgc:'#7ea6c8'},
        {title:'小组管理',description:'用户可创建加入小组，以组为单位进行项目开发。',bgc:'#967ec8'},
        {title:'任务管理',description:'发布限时任务，可用于周报提交、收集资料、发布阶段成功等',bgc:'#7e8cc8'},
        {title:'项目管理',description:'即时查看更新项目进度、成员等信息，还可下载查看成员提交的内容与文件。',bgc:'#827ec8'},
        {title:'便签功能',description:'随时自订便签，待办工作不遗忘。',bgc:'#907ec8'},
        {title:'即时通知',description:'小组成员可及时收到消息，提高沟通交流效率',bgc:'#7e8dc8'}
      ]
    }
  }
}
</script>

<style scoped>
.function-card > .main{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>