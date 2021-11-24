<template>
<div style="height: 100vh;text-align: center">
  <h2>研究与开发实践XM06</h2>

  <el-link v-if="isLogin" @click="toIndex">您已登录，点击进入系统</el-link>
  <el-link v-else>尚未登录，请点击右上角登录</el-link>
</div>
</template>

<script>
export default {
  name: "Introduce",
  computed: {
    isLogin() {
      return this.$store.getters.getLoginUser != null
    }
  },
  methods: {
    toIndex() {
      this.$router.push("/index")
    }
  }
}
</script>

<style scoped>

</style>