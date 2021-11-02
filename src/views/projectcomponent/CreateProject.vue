<template>
  <div class="create-project">

    <show-window>
      <div slot="title">
        <i class="el-icon-s-finance"></i>
        <span>项目管理</span>
        <i class="el-icon-arrow-right"></i>
        <span>创建项目</span>
      </div>

      <div slot="main">
        开发中
      </div>
    </show-window>
  </div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow"
export default {
  name: "CreateProject",
  components: {
    ShowWindow
  }
}
</script>

<style scoped>

</style>