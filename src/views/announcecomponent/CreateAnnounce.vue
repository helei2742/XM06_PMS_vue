<template>
<div>
  <show-window>
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>公告管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>发布公告</span>
    </div>

    <div slot="main">
      <create-announce-form @createAnnounce="createAnnounce"/>
    </div>

  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import CreateAnnounceForm from "@/views/announcecomponent/createannouncechild/CreateAnnounceForm";
import {createAnnounceNetwork} from "@/network/announce";
export default {
  name: "CreateAnnounce",
  components: {CreateAnnounceForm, ShowWindow},
  methods:{
    createAnnounce(form){
      const loading = this.$loading({
        lock: true,
        text: '正在发布公告',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let userId = this.$store.getters.getLoginUser.id

      createAnnounceNetwork(userId, form.title, form.mainBody).then(data=>{
        console.log(data)
        if(data.code === 200){
          this.$message.success('发布公告成功')
        }else {
          this.$alert('发布公告失败，' + data.msg)
        }
      }).finally(()=>{
        loading.close()
      })
    }
  }
}
</script>

<style scoped>

</style>