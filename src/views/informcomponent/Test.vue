<template>
<div>
  hhhhhhhhhhhhhhhhhhhh
  <div id="message"></div>
  <hr />
  <div id="main"></div>
  <div id="client"></div>
  <input id="text" type="text" />
  <button @click="send()">发送消息</button>
  <hr />
  <button @click="closeWebSocket()">关闭WebSocket连接</button>
</div>
</template>

<script>
export default {
  name: "Test",
  data(){
    return{
      uid: null,
      groupId: null,
      websocket: null
    }
  },
  methods:{
    //关闭WebSocket连接
    closeWebSocket() {
      this.websocket.close();
      alert('websocket.close: 关闭websocket连接')
    },
    //发送消息
    send() {
      let message = document.getElementById('text').value;
      try {
        let informInfo = {message: message, groupId: this.groupId, }
        this.websocket.send(JSON.stringify(informInfo));

        console.log("websocket.send: " + message);
      } catch (err) {
        console.error("websocket.send: " + message + " 失败");
      }
    }
  },
  mounted() {
    this.uid = this.$store.getters.getLoginUser.id
    this.groupId = 16
    document.getElementById('client').innerHTML += "客户端 id = " + this.uid + '<br/>';
    this.websocket = null;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
      // 改成你的地址
      this.websocket = new WebSocket("ws://127.0.0.1:9000/pms/api/websocket/" + this.uid+"/"+this.groupId);
    } else {
      alert('当前浏览器 Not support websocket')
    }

    //连接发生错误的回调方法
    this.websocket.onerror = function () {
      console.log("websocket.onerror: WebSocket连接发生错误");
    };

    //连接成功建立的回调方法
    this.websocket.onopen = function () {
      console.log("websocket.onopen: WebSocket连接成功");
    }

    //接收到消息的回调方法
    this.websocket.onmessage = function (event) {
      console.log("websocket.onmessage: " + event.data);
    }
    //连接关闭的回调方法
    this.websocket.onclose = function () {
      console.log("websocket.onclose: WebSocket连接关闭");
    }
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
      this.closeWebSocket();
    }
  }
}
</script>

<style scoped>

</style>