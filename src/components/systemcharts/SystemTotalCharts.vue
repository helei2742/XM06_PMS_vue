<template>
  <div style="width: auto;height: 400px;padding: 15px" id="systemTotalChart">
  </div>
</template>

<script>
import {querySystemRecordTotalNetwork} from "@/network/charts";

export default {
  name: "SystemTotalCharts",
  data(){
    return {
      option: {
        title: {
          text: '系统使用情况统计'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: 'black',
                    fontSize: 16
                  }
                }
              }
            }
          }
        ]
      },
      color: ['#c7c87e','#c8a57e','#7ec897','#c8917e','#cea08b','#c8a47e','#a5c87e']
    }
  },
  methods:{
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('systemTotalChart')).setOption(this.option)
    },
    setOption(xAxisData, seriesData){
      this.option.xAxis.data = xAxisData
      this.option.series[0].data = seriesData
    }
  },
  mounted() {
    querySystemRecordTotalNetwork().then(data=>{
      let xAxisData = data.xAxis
      let seriesData = []
      for (let i = 0; i < data.series.length; i++) {
        let e = data.series[i]
        let item =  {
          value: e,
          itemStyle: {
            color: this.color[i]
          }
        }
        seriesData.push(item)
      }
      this.setOption(xAxisData, seriesData)
      this.echartsInit()
    })
  }
}
</script>

<style scoped>

</style>