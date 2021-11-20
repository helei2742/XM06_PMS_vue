<template>
<div style="height: 100vh;text-align: center">
  <h2>研究与开发实践XM06</h2>

</div>
</template>

<script>
export default {
  name: "Introduce",
  mounted() {
    let user = this.$store.getters.getLoginUser
    if(user != null)
      this.$router.push('/index/welcome')
  }
}
</script>

<style scoped>

</style>