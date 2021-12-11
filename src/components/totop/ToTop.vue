<template>
<div class="to-top">
  <el-button @click="toTopClick" circle>
    <i class="el-icon-top" style="font-size: 24px"></i>
  </el-button>
</div>
</template>

<script>
export default {
  name: "ToTop",
  methods: {
    toTopClick(){
      this.$emit('toTop')
    }
  }
}
</script>

<style scoped>
.to-top{
  position: fixed;
  right: 40px;
  bottom: 40px;
}
</style>