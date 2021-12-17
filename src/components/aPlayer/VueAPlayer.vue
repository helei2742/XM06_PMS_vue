<template>
<div>
  <div id="player"></div>
</div>
</template>

<script>

import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer/dist/APlayer.min';
import {AUDIOURLS} from "@/config/live2dConfig";
export default {
  name: "VueAPlayer",
  data(){
    return {
      ap: null
    }
  },
  mounted() {
    const audioUrls = AUDIOURLS
    this.ap = new APlayer({
      container: document.getElementById('player'),
      mini: false,
      autoplay: false,
      theme: '#FADFA3',
      loop: 'all',
      order: 'random',
      preload: 'auto',
      volume: 0.7,
      mutex: true,
      listFolded: false .toSource,
      listMaxHeight: 90,
      lrcType: 3,
      audio: audioUrls
    });
  },
  methods:{
    playNext(){
      this.ap.skipForward()
    },
    playPre(){
      this.ap.skipBack()
    },
    toggle(){
      this.ap.toggle()
    },
    isPlaying(){
      return !this.ap.audio.paused
    }
  }
}
</script>

<style scoped>

</style>