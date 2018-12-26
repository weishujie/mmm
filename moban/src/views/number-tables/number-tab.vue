<template>
  <div class="introduction">
    <div class="content-title">游戏桌数排名</div>
    <div class="block">
      <div class="inputSize">
        <!-- <el-input v-model="formData.rank" placeholder="查询多少名"></el-input> -->
        <el-date-picker v-model="formData.date" type="date" placeholder="选择查询时间"></el-date-picker>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column type="index" label="排名" width="180"></el-table-column> -->
      <el-table-column prop="uid" label="用户" width="180"></el-table-column>
      <el-table-column prop="num" label="当天局数"></el-table-column>
      <!-- <el-table-column
        prop="address"
        label="操作">
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import { NumberOfgram, InitOfgram } from "@/api/statistics";
import store from "@/store/index";
import { create } from "domain";
export default {
  directives: {},
  data() {
    return {
      tableData: [],
      formData: {
        // uid: store.getters.uid,
        //rank: "",
        date: ""
      }
    };
  },
  methods: {
    tabinit() {
      var _this = this;
      InitOfgram().then(resp => {
        console.log(resp, "pop");
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            console.log(resp);
            var list = resp.data.data; //这是数组
            _this.tableData = list;
          } else {
            this.$message.error({
              message: resp.data.msg || "请求异常提示",
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
    search() {
      var _this = this;
      if (_this.formData.date == "") {
        return _this.$message.warning({
          message: "时间不能为空",
          center: true,
          duration: 2000
        });
      }
      console.log("_this.formData", _this.formData);
      NumberOfgram(_this.formData).then(resp => {
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            console.log(resp, "resp;;;;");
            var list = resp.data.data; //这是数组
            _this.tableData = list;
          } else {
            this.$message.error({
              message: resp.data.msg || "请求异常提示",
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
    }
  },
  created() {
    this.tabinit();
  },
  watch: {
    $route(to, from) {
      // console.log(to.path,from.path,"path___________")
      if (to.path == "/number-tab/number-tab") {
        this.tabinit();
      }
    }
  }
};
</script>

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
    .inputSize .el-input {
      width: 200px !important;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      margin-bottom: 10px;
    }
  }
}
</style>
