<template>
<div class="member-card">

  <member-card-item v-for="info in infoList">
    <div slot="img">
      <img :src="info.imgSrc" alt="">
    </div>
    <div slot="info">
      <span>{{info.name}}</span>
      <p>{{info.desc}}</p>
    </div>
  </member-card-item>
</div>
</template>

<script>
import MemberCardItem from "@/views/introducecomponent/membercard/MemberCardItem";
import {INTRODUCEMEMBERIMG} from "@/util/imageUrl";

export default {
  name: "MemberCard",
  components: {MemberCardItem},
  data() {
    return {
      infoList: INTRODUCEMEMBERIMG
    }
  }
}
</script>

<style scoped>
.member-card{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.member-card img{
  width: 300px;
}
</style>