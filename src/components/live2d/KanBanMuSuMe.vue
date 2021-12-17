<template>
<div class="kanbanmusume"
     @mouseenter="handleMouseenter"
     @mouseleave="handleMouseleave"
     :style="getStyle">
  <div style="position:relative">
    <control-bar v-show="isShowControlBar"
                 @showIt="showIt"
                 @camera="takeCamera"
                 @announce="showAnnounce"
                 @change="changeIt"
                 @audio="audioPlayer"
                 @audioControl="audioControl"
                 @closeIt="closeIt"/>

    <div v-show="isShowAudioControl" class="vue-aplayer-ctl-bar">
      <el-tooltip effect="dark" content="上一首" >
        <i @click="preAudio" class="el-icon-caret-left"></i>
      </el-tooltip>
      <el-tooltip v-if="!isPlaying" effect="dark" content="播放">
        <i @click="playAudio" class="el-icon-video-play"></i>
      </el-tooltip>
      <el-tooltip v-else effect="dark" content="暂停">
        <i @click="playAudio" class="el-icon-video-pause"></i>
      </el-tooltip>
      <el-tooltip effect="dark" content="下一首" >
        <i @click="nextAudio" class="el-icon-caret-right"></i>
      </el-tooltip>
      <el-tooltip effect="dark" content="关闭播放控制条" >
        <i style="font-size: 12px;position:absolute;right: 0;top:0" @click="nextAudio" class="el-icon-close"></i>
      </el-tooltip>
    </div>

    <vue-a-player class="audio-player"
                  ref="audioPlayer"
                  v-show="isShowAudioPlayer"
                  :style="{'width': width+'px'}"/>

    <el-dialog
        title="模型使用声明"
        :visible.sync="dialogVisible"
        width="300px"
        :modal="false"
        center>
      <span>本模型为Poppin Party 贝斯手 牛込 りみ 和 Garupa SEASON 2 倉田 ましろ，由网站爬取二次制作完成；不用做任何商业用途，如有侵权请联系</span>
      <div>手机号: 19141273392</div>
      <div>email: 914577981@qq.com</div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>

  </div>

</div>
</template>

<script>
import ControlBar from "@/components/live2d/ControlBar";
import {HANASHI} from "@/config/live2dConfig";
import {throttle,debounce} from "@/util/baseUtil";
import VueAPlayer from "@/components/aPlayer/VueAPlayer";

export default {
  name: "KanBanMuSuMe",
  components: {VueAPlayer, ControlBar},
  computed:{
    getStyle(){
      return {
        width: this.width+'px',
        height: (this.height*0.55)+'px',
      }
    },
    throttleDialog(){
      return throttle(this.showDialog, 5000)
    }
  },
  data() {
    return {
      models: ['vo','rimi01','rimi02','rimi03','rimi04'],
      currentModel: 0,
      width: 150,
      height: 300,
      isShowControlBar: false,
      isShowAudioControl: false,
      isShowAudioPlayer: false,
      dialogVisible: false,
      kanbanmusume: null,
      hanashi: HANASHI,
      isPlaying: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      let size = this.$store.getters.getScreenSize;
      if(size.width < 700){
        this.width = 250
        this.height = 450
      }else if(size.width >= 700){
        this.width = 300
        this.height = 600
      }
      this.live2dInit()
    })
  },
  methods: {
    live2dInit() {
      window.L2Dwidget.on('*',(name)=>{
        let text = ''
        if(name === 'tapface'){
          let i = Math.round(Math.random()*(this.hanashi.tapface.length-1))
          text = this.hanashi.tapface[i]
        }else if(name === 'tapbody'){
          let i = Math.round(Math.random()*(this.hanashi.tapbody.length-1))
          text = this.hanashi.tapbody[i]
        }

        if(text !== '')
          this.throttleDialog(text)
      })
      this.kanbanmusume = new window.L2Dwidget.constructor()
      this.kanbanmusume.init({
        pluginRootPath: 'live2dw/',                 //指向你的目录
        pluginJsPath: 'lib/',                       //指向你的目录
        pluginModelPath: 'live2d-widget-model-nico/assets/',                                   //中间这个koharu就是你的老婆,想换个老婆,换这个就可以了
        tagMode: false,
        debug: false,
        model: { jsonPath: '/live2dw/live2d-widget-model-rimi/'+this.models[this.currentModel]+'.model.json' },       //中间这个koharu就是你的老婆,想换个老婆,换这个就可以了
        display: { position: 'right', width: this.width, height: this.height ,vOffset: -150},                               //调整大小,和位置
        mobile: { show: false },                                                                //要不要盯着你的鼠标看
        name:{
          canvas: 'kanbanCanvas'
        },
        dialog:{
          enable: true
        }
      })
    },
    handleMouseenter(){
      this.isShowControlBar = true

    },
    handleMouseleave() {
      this.isShowControlBar = false

    },
    closeIt(){
      document.getElementById('kanbanCanvas').style.visibility = 'hidden'
    },
    showIt(){
      document.getElementById('kanbanCanvas').style.visibility = 'visible'
    },
    showAnnounce(){
      this.dialogVisible = true
    },
    takeCamera(){
      window.L2Dwidget.downloadFrame()
    },
    changeIt(){
      if(++this.currentModel >= this.models.length){
        this.currentModel = 0
      }
      window.L2Dwidget.config.model = { jsonPath: '/live2dw/live2d-widget-model-rimi/'+this.models[this.currentModel]+'.model.json' }
      this.kanbanmusume.init()
    },
    showDialog(text){
      console.log(text)
      let live2dDialog = document.getElementsByClassName('live2d-widget-dialog')[0]
      if(live2dDialog.style.opacity === 1){
        return
      }
      live2dDialog.style.opacity = 1
      live2dDialog.innerText = text
      setTimeout(()=>{
        live2dDialog.style.opacity = 0
      },5000)
    },
    audioPlayer(){
      this.isShowAudioPlayer = !this.isShowAudioPlayer
    },
    audioControl(){
      this.isShowAudioControl = !this.isShowAudioControl
    },
    playAudio(){
      this.$refs.audioPlayer.toggle()
      this.isPlaying = this.$refs.audioPlayer.isPlaying()
    },
    preAudio(){
      this.$refs.audioPlayer.playPre()
    },
    nextAudio(){
      this.$refs.audioPlayer.playNext()
    }
  }
}
</script>

<style scoped>
.kanbanmusume{
  z-index: 900;
  position: fixed;
  bottom: 0;
  right: 0;
}
.audio-player{
  position: absolute;
  top: -120px;
}
.vue-aplayer-ctl-bar{
  text-align: center;
  position: fixed;
  bottom: 20px;
  width: 300px;
  left: 50%;
  margin-left: -150px;
  font-size: 45px;
  color: rgba(255,255,255,0.7);
}
.vue-aplayer-ctl-bar > i:hover{
  cursor: pointer;
}
</style>