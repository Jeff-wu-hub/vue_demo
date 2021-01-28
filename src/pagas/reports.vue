<template>
  <div style="width: 100%;height: 100%;overflow: hidden;">
    <h3 style="text-align: center;font-size: 50px">数据报表</h3>
    <div id="charts"/>
  </div>
</template>
<script></script>
<style></style>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      // 获取charts数据
      async getChartsData () {
        const { data: res } = await this.$http.get('reports/type/1')
        this.chartsData = res.data
        const charts = this.$echarts.init(document.getElementById('charts'))
        charts.setOption(this.chartsData)
      }
    },
    mounted () {
    },
    created () {
      this.getChartsData()
    }
  }
</script>
<style>
  #charts{
    margin: 5% 0 0 50%;
    transform: translate(-50%);
    width: 90%;
    height: 80%;
  }
</style>
