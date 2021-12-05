<template>
<div class="edit-announce">
  <show-window>
    <div slot="title">
      <i class="el-icon-s-order"></i>
      <span>公告管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>修改公告</span>
    </div>

    <div slot="main">
      <edit-announce-form ref="editAnnounce"
                          @alterAnnounce="alterAnnounce"
                          @deleteAnnounce="deleteAnnounce"
                          :announce="announce"/>
    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import {alterAnnounceNetwork, deleteAnnounceNetwork, queryAnnounceByIdNetwork} from "@/network/announce";
import EditAnnounceForm from "@/views/announcecomponent/editannouncechild/EditAnnounceForm";

export default {
  name: "editAnnounce",
  components: {EditAnnounceForm, ShowWindow},
  data(){
    return {
      announce: null,
    }
  },
  methods:{
    alterAnnounce(form){
      form.userId = this.$store.getters.getLoginUser.id
      const loading = this.$loading({
        lock: true,
        text: '正在修改公告',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(()=>{},2000)
      alterAnnounceNetwork(form).then(data=>{
        if(data.code === 200){
          this.$message.success('修改公告成功')
        }else{
          this.$alert('修改公告失败，'+data.msg)
        }
      }).finally(()=>{
        loading.close()
      })
    },

    deleteAnnounce(announceId){
      let userId = this.$store.getters.getLoginUser.id

      const loading = this.$loading({
        lock: true,
        text: '正在删除公告',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      deleteAnnounceNetwork(announceId, userId).then(data=>{
        if(data.code === 200){
          this.$alert('删除成功')
        }else {
          this.$alert('删除失败，'+data.msg)
        }
      }).finally(()=>{
        loading.close()
      })

    }
  },
  activated() {
    let announceId = this.$route.query.announceId
    let announce = this.$route.query.announce
    if(announce.id === undefined){

      queryAnnounceByIdNetwork(announceId).then(data=>{
        if(data.code === 200){
          let announce = data.result
          announce.mainBody = announce.mainBody.slice(9,data.result.mainBody.length)
          this.announce = announce
          this.$refs.editAnnounce.reset(announce)
        }else{
          this.$message.error('获取公告信息失败，'+data.msg)
        }
      })
    }else {
      this.announce = announce
      this.$refs.editAnnounce.reset(announce)
    }
  }
}
</script>

<style scoped>

</style>