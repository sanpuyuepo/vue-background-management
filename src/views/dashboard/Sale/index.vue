<template>
  <el-card class="box-card">
    <div slot="header" class="tabs">
      <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="sale"> </el-tab-pane>
        <el-tab-pane label="访问量" name="pageviews"> </el-tab-pane>
      </el-tabs>
      <!-- 时间选择 -->
      <div class="date-picker">
        <span @click="setDay"><a>今日</a></span>
        <span @click="setWeek"><a>本周</a></span>
        <span @click="setMonth"><a>本月</a></span>
        <span @click="setYear"><a>今年</a></span>
        <el-date-picker
          v-model="data"
          value-format="yyyy-MM-dd"
          style="width: 220px; margin: 0 20px"
          size="mini"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
    </div>

    <div>
      <el-row :gutter="10">
        <el-col :span="20">
          <div class="chart" ref="myCharts"></div>
        </el-col>
        <el-col :span="4">
          <div>
            <h3>{{ title }}排名</h3>
            <ul>
              <li>
                <span class="order top3">1</span>
                <span>肯德基</span>
                <span>123456</span>
              </li>
              <li>
                <span class="order top3">2</span>
                <span>肯德基</span>
                <span>123456</span>
              </li>
              <li>
                <span class="order top3">3</span>
                <span>肯德基</span>
                <span>123456</span>
              </li>
              <li>
                <span class="order">4</span>
                <span>肯德基</span>
                <span>123456</span>
              </li>
              <li>
                <span class="order">5</span>
                <span>肯德基</span>
                <span>123456</span>
              </li>
              <li>
                <span class="order">6</span>
                <span>肯德基</span>
                <span>123456</span>
              </li>
              <li>
                <span class="order">7</span>
                <span>肯德基</span>
                <span>123456</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from 'dayjs'

export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      myCharts: null,
      data: [],
    };
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.myCharts);
    this.myCharts.setOption({
      title: {
        text: this.title,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "20%",
          data: [
            10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220,
          ],
        },
      ],
    });
  },
  computed: {
    title() {
      return this.activeName === "sale" ? "销售额" : "访问量";
    },
  },
  watch: {
    title() {
      this.myCharts.setOption({
        title: {
          text: this.title,
        },
      });
    },
  },
  methods: {
    setDay() {
      const today = dayjs().format('YYYY-MM-DD');
      this.data = [today, today]
    },
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.data = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.data = [start, end];
    },
    setYear() {
     const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.data = [start, end];
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
};
</script>

<style>
.el-card__header {
  border-bottom: none;
}
</style>
<style scoped>
.box-card {
  margin: 20px 0;
}

.tabs {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.tab {
  width: 100%;
}

.date-picker {
  position: absolute;
  right: 0;
}

.date-picker span {
  margin: 0 10px;
}

.chart {
  width: 100%;
  height: 300px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 10px 0;
}

ul span {
  margin-right: 30px;
}

.order {
  display: inline-block;
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  border-radius: 50%;
  color: #000;
  background: #fff;
}

.top3 {
  background: #000;
  color: #fff;
}
</style>
