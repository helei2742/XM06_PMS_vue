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
        {title:'用户管理',description:'这是一段很高级的描述',bgc:'#7ea6c8'},
        {title:'小组管理',description:'这是一段很高级的描述',bgc:'#967ec8'},
        {title:'任务管理',description:'这是一段很高级的描述',bgc:'#7e8cc8'},
        {title:'项目管理',description:'这是一段很高级的描述',bgc:'#827ec8'},
        {title:'便签功能',description:'这是一段很高级的描述',bgc:'#907ec8'},
        {title:'即时通知',description:'这是一段很高级的描述',bgc:'#7e8dc8'}
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