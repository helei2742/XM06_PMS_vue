<template>
  <div class="project-update-record-item">

    {{record}}
  </div>
</template>

<script>
export default {
  name: "ProjectUpdateRecordItem",
  props: {
    record: {
      type: Object,
      default() {
        return null
      }
    }
  }
}
</script>

<style scoped>

</style>