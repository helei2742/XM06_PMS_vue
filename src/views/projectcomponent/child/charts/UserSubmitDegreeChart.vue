<template>
<!--  用户进度提交情况-->
  <div v-loading="loading">
    <div style="width:auto;height:480px;padding: 15px;min-width: 320px" id="userSubmitDegreeChart">
    </div>
  </div>

</template>

<script>

import {queryUserProjectDegreeNetwork} from "@/network/charts";

export default {
  name: "UserSubmitDegreeChart",
  data(){
    return {
      loading: false,
      option : {
        title: {
          text: '进度提交概况',
          subtext: '成员进度对比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}% ({d}%)"
        },
        legend: {
          orient: 'vertical', // 布局方式，默认为水平布局，可选为：'horizontal' ¦ 'vertical'
          // 水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          x: 'left',
          // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          y: 'bottom',
          // 重写legend显示样式
          formatter:(name)=> {
            // 获取legend显示内容
            let data = this.option.series[0].data;
            let total = 0;
            let tarValue = 0;
            for (let i = 0, l = data.length; i < l; i++) {
              total += data[i].value | 0;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            // let p = (tarValue / (total * 100 | 1));
            let p = tarValue

            return name + ' ' + ' ' + p + '%';
          },
          data: []
        },
        series: [
          {
            name: '项目进度占比(在提交者中占比)',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    //初始化echarts
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('userSubmitDegreeChart')).setOption(this.option)
    },
    setOption(seriesData, legendData){
      this.option.series[0].data = seriesData
      this.option.legend.data = legendData
    },
    loadChart(projectId) {
      this.loading = true
      queryUserProjectDegreeNetwork(projectId).then((data)=>{
        let seriesData = []
        if(data.code === 200){
          console.log(data)
          for (let i = 0; i < data.names.length; i++) {
            let t = {
              value: data.values[i]*100,
              name: data.names[i]
            }
            seriesData.push(t)
          }
          this.setOption(seriesData, data.names)
          this.echartsInit()
        }
      }).finally(()=>{
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>