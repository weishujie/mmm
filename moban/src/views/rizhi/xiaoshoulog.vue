<template>
  <div class="introduction">
    <div class="content-title">销售日志</div>
    <div class="block">
      <el-date-picker v-model="formData.start" type="date" placeholder="选择开始日期"></el-date-picker>
      <el-date-picker v-model="formData.end" type="date" placeholder="选择结束日期"></el-date-picker>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <!-- <div id="myChart" style="width: 800px;height:400px;"></div> -->
    <!-- <div class="e_chart">
       <schart :canvasId="canvasId"
            :type="type"
            :width="width"
            :height="height"
            :data="tableData"
    ></schart>-->
    <!-- </div> -->
  </div>
</template>

<script>
import { Xiaoshou } from "@/api/log";
import store from "@/store/index";
import Schart from "vue-schart";
let moment = require("moment");
// 引入基本模板
// let echarts = require("echarts/lib/echarts");
// // 引入柱状图组件
// require("echarts/lib/chart/bar");
// // 引入提示框和title组件
// require("echarts/lib/component/tooltip");
// require("echarts/lib/component/title");
// require("echarts/lib/component/legend");
// require("echarts/lib/component/toolbox");
export default {
  components: {
    Schart
  },
  directives: {},
  data() {
    return {
      canvasId: "myCanvas",
      type: "bar",
      width: 500,
      height: 400,
      tableData: [],
      formData: {
        // uid: store.getters.uid,
        start: moment()
          .subtract(7,'days')
          .format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
      },
      timeData: [],
      userC: [],
      webS: [],
      smallGame: [],
      toDealer: []
    };
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      var _this = this;
      if (!_this.formData.start || !_this.formData.end) {
        return _this.$message.warning({
          message: "请选择起始和截止时间",
          center: true,
          duration: 2000
        });
      } else if (_this.formData.start > _this.formData.end) {
        return _this.$message.warning({
          message: "截止时间不能小于起始时间",
          center: true,
          duration: 2000
        });
      }
      Xiaoshou(_this.formData).then(resp => {
        if (resp.status == 200) {
          if (
            resp.data.info.date != "" ||
            resp.data.info.charge != "" ||
            resp.data.info.smallGame != "" ||
            resp.data.info.toDealer != ""
          ) {
            var list = resp.data.info;
            _this.timeData = list.date;
            _this.userC = list.charge;
            _this.smallGame = list.smallGame;
            _this.toDealer = list.toDealer;
            _this.postChart();
          } else {
            this.$message.info({
              message: "暂无数据",
              center: true,
              duration: 2000
            });
            // document.getElementById("myChart").innerHTML="暂无数据。。。。"
          }
          //_this.tableData=[];
          // list.forEach(itme => {
          //   _this.tableData.push({ name: itme._id, value: itme.num });
          // });
          // _this.tableData = list;
          // console.log(resp);
        } else {
          this.$message.error({
            message: "与服务器通讯异常",
            center: true,
            duration: 2000
          });
        }
      });
    },
    postChart() {
      var myChart = echarts.init(document.getElementById("myChart"));
      var option = {
        title: {
          text: "",
          subtext: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["用户充值", "web上下分", "小游戏上下分", "银商上下分"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.timeData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "用户充值",
            type: "bar",
            data: this.userC,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "web上下分",
            type: "bar",
            data: this.webS,
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "小游戏上下分",
            type: "bar",
            data: this.smallGame,
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "银商上下分",
            type: "bar",
            data: this.toDealer,
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style>
.e_chart canvas {
  width: auto !important;
  height: 500px !important;
}
.myChart {
  width: 100%;
  height: 500px;
}
</style>
<style scoped lang="scss">
.title {
  margin-top: 20px;
}
.introduction {
  padding: 20px;
  padding-bottom: 300px;
  overflow: hidden;
  .content-title {
    width: 100%;
    height: 40px;
    background-color: rgb(241, 240, 240);
    line-height: 40px;
    margin-bottom: 10px;
    padding-left: 5px;
  }
  .block {
    .inputSize {
      margin-bottom: 10px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      margin-bottom: 10px;
    }
  }
}
</style>