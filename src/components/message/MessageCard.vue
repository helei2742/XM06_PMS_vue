<template>

<div class="message-card">
  <el-collapse-transition>
  <el-row v-show="isShow">
    <el-col style="position: relative" :offset="3" :span="16">
      <el-alert :type="type" :title="msgTitle" :description="message" show-icon :closable="false"></el-alert>
      <span @click="cardClose" class="el-icon-close close"></span>
    </el-col>
  </el-row>
  </el-collapse-transition>
</div>

</template>

<script>
import {emitCardCloseEvent} from "@/util/eventbus";

export default {
  name: "MessageCard",
  props: {
    type: {
      type: String,
      default: 'info'
    },
    msgTitle: {
      type: String,
      default: '消息提示的文案'
    },
    message: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cardClose() {
      emitCardCloseEvent.call(this)
    }

  }

}
</script>

<style scoped>
.message-card{
  position: fixed;
  width: 300px!important;
  top: 10px;
  z-index: 10;
  left: 50%;
  margin-left: -140px;
}
.message-card .close{
  position: absolute;
  right: 0;
  top: 0;
}
</style>