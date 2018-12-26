<template>
  <div class="introduction">
    <div class="content-title">三级返利日志</div>
    <div class="block">
      <el-date-picker v-model="formData.start" type="date" placeholder="选择开始日期"></el-date-picker>
      <el-date-picker v-model="formData.end" type="date" placeholder="选择结束日期"></el-date-picker>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="">
       <div id="main" style="width: 100%;height:400px;"></div>
      <!-- <schart :canvasId="canvasId"  :style="{height:'400px'}" :type="type" :width="width" :height="height" :data="tableData"></schart> -->
    </div>
  </div>
</template>

<script>
import { Logthree } from "@/api/log";
import store from "@/store/index";
import Schart from "vue-schart";
let moment = require("moment");
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
      tableNum:[],
      formData: {
        // uid: store.getters.uid,
        start:moment().subtract(7,'days').format('YYYY-MM-DD'),
        end:moment().format('YYYY-MM-DD')
      }
    };
  },
  created(){
    this.search()
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
      Logthree(_this.formData).then(resp => {
        if (resp.status == 200) {
          if (resp.data.code == 200 && resp.data.data != "") {
            var list = resp.data.data;
            _this.tableData = [];
            _this.tableNum=[]
           list.forEach(itme => {
              _this.tableNum.push(itme.num);
              _this.tableData.push(itme._id);
            });
            this.postChart();
          } else {
            this.$message.info({
              message: "暂无数据",
              center: true,
              duration: 2000
            });
          }
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
      var myChart = echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {},
        xAxis: {
          data: this.tableData,
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {},
        series: [
          {
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "red"
                  }
                }
              }
            },
            // name: '销量',
            type: "bar",
            data: this.tableNum
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style>
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