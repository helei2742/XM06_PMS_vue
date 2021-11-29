<template>
<div class="member-card-item">
  <el-card :body-style="{ padding: '0px' ,maxWidth:'310px'}">
    <slot name="img">
      <img src="@/assets/img/memberimg/member_img_default.png">
    </slot>
    <div style="padding: 14px;">
      <slot name="info">
        <span>项目经理:何磊</span>
        <p>四川大学计算机与科学专业本科生</p>
      </slot>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: "MemberCardItem"
}
</script>

<style scoped>
.member-card-item{
  margin: 10px;
}
.member-card-item span{
  font-size: 28px;
}
.member-card img{
  width: 300px;
}
</style>