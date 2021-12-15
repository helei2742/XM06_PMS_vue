<template>
<div class="kanbanmusume">

</div>
</template>

<script>
export default {
  name: "KanBanMuSuMe",
  data() {
    return {
      // model: 'miku',
      model: 'koharu',
      // model: 'tororo',
      // model: 'hibiki',
      // model: 'haru_2',
      // model: 'haru_1',
      // model: 'shizuku',
      // model: 'ni-j',
      // model: 'unitychan',
      // model: 'gf',
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.live2dInit()
    })
  },
  methods: {
    live2dInit() {
      window.L2Dwidget.init({
        pluginRootPath: 'live2dw/',                 //指向你的目录
        pluginJsPath: 'lib/',                       //指向你的目录
        pluginModelPath: 'live2d-widget-model-nico/assets/',                                   //中间这个koharu就是你的老婆,想换个老婆,换这个就可以了
        // tagMode: false,
        // debug: false,
        model: { jsonPath: '/live2dw/live2d-widget-model-'+this.model+'/assets/'+this.model+'.model.json' },       //中间这个koharu就是你的老婆,想换个老婆,换这个就可以了
        display: { position: 'right', width: 150, height: 350 },                               //调整大小,和位置
        mobile: { show: true },                                                                //要不要盯着你的鼠标看
        log: true,
        // dialog: {
        //   enable: true,
        //   "script": {
        //     //每20s，显示一言（调用一言Api返回的句子）
        //     'every idle 20s': '$hitokoto$',
        //     //触摸到class='star'对象
        //     'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
        //     //触摸到身体
        //     'tap body': '害羞?(? ???ω??? ?)?',
        //     //触摸到头部
        //     'tap face': '~~'
        //   }
        // }
      })
    },
  }
}
</script>

<style scoped>

</style>