<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥126560">
            <template v-slot:charts>
              <span>周同比 56.67%</span><i class="el-icon-caret-top"></i>
              <br>
              <br>
              <span>日同比 19.65%</span><i class="el-icon-caret-bottom"></i>
            </template>
            <template v-slot:footer>
              <span>日销售额 ￥12345</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template v-slot:charts>
              <LineChart></LineChart>
            </template>
            <template v-slot:footer>
              <span>日销售额 ￥12345</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
             <template v-slot:charts>
               <BarChart></BarChart>
            </template>
            <template v-slot:footer>
              <span>日销售额 ￥12345</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
             <template v-slot:charts>
               <Progresss></Progresss>
            </template>
            <template v-slot:footer>
              <span>日销售额 ￥12345</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineChart from './LineChart'
import BarChart from './Bar'
import Progresss from './Progress'

export default {
  name: "Card",
  data() {
    return {};
  },
  components: {
    Detail,
    LineChart,
    BarChart,
    Progresss
  },
};
</script>

<style scoped></style>
