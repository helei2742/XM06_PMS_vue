<template>

  <div style="width: auto;height: 400px;padding: 15px" id="system7dayChart">
  </div>

</template>

<script>
import {querySystemRecord7dayNetwork} from "@/network/charts";

export default {
  name: "System7dayCharts",
  data(){
    return {
      option : {
        title: {
          text: '7天内的使用情况',
          y:'bottom',
          x: 'center',
          textStyle: {
            marginBottom: 15
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [],
          x: 'center',
          padding:[0,25,0,0]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top:'80px',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 人'
          }
        },
        series: []
      },
      legendData: [],
      series: [],
      xAxisData: []
    }
  },
  methods: {
    //初始化echarts
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('system7dayChart')).setOption(this.option)
    },
    setOption(legendData,xAxisData,series) {
      this.option.legend.data = legendData
      this.option.xAxis.data = xAxisData
      this.option.series = series
    }
  },
  mounted(){
    // 在通过mounted调用即可

    querySystemRecord7dayNetwork().then(data=>{
      let xAxisData = data.xAxis
      let legendData = data.legend
      let series = []
      for (let key in data.series) {
        let seriesItem = {
          type: 'line'
        }
        seriesItem.name = key
        seriesItem.data = data.series[key]
        series.push(seriesItem)
      }

      this.setOption(legendData, xAxisData, series)
      this.echartsInit()
    })
  },
}
</script>

<style scoped>

</style>