<template>
  <!-- echarts 容器 -->
  <div class="chart" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Progresss",
  data() {
    return {};
  },
  mounted() {
    let progressChart = echarts.init(this.$refs.chart);
    progressChart.setOption({
      tooltip: {},
      legend: {},
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          barWidth: "20%",
          color: "yellowgreen",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(220, 220, 220, 0.8)",
          },
          label: {
            show: true,
            formatter: "|",
            position: 'right'
          }
        },
      ],
    });
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
