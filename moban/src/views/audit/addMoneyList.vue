<template>
  <div class="introduction">
    <div class="content-title">赠送金币记录</div>
    <div class="block">
      <div class="inputSize">
        <el-date-picker v-model="formData.start" type="date" placeholder="选择开始日期"></el-date-picker>
        <el-date-picker v-model="formData.end" type="date" placeholder="选择结束日期"></el-date-picker>
        <el-input v-model="formData.uid" placeholder="请输入玩家id"></el-input>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width:100%">
      <el-table-column prop="Operator" label="操作人"></el-table-column>
      <el-table-column prop="uid" label="玩家ID"></el-table-column>
      <el-table-column prop="money" label="赠送金额"></el-table-column>
      <el-table-column prop="dateTime" label="赠送时间" :formatter="dateFormat"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagedata.current"
      :page-sizes="[20, 30, 40,50,100]"
      :page-size="pagedata.PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagedata.Total"
    ></el-pagination>
  </div>
</template>
<script>
import { addUserMoneyLog } from "@/api/management";
import store from "@/store/index";
let moment = require("moment");
export default {
  directives: {},
  data() {
    return {
      tableData: [],
      formData: {
        uid: "",
        start:moment().subtract(7,'days').format('YYYY-MM-DD'),
        end:moment().format('YYYY-MM-DD'),
        limit: 20,
        skip: 0,
        type:1
      },
      pagedata: { current: 1, PageSize: 20, Total: 0 }
    };
  },
  methods: {
     init() {
      var _this = this;
      _this.formData.limit = _this.pagedata.PageSize;
      _this.formData.skip =
        (_this.pagedata.current - 1) * _this.pagedata.PageSize;
      console.log("parm:", _this.formData);
      addUserMoneyLog(_this.formData).then(resp => {
        console.log("resp:", resp);
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            _this.tableData = resp.data.info.list;
            _this.pagedata.Total = resp.data.total.total;
          } else {
            _this.$message.error({
              message: resp.data.msg || "请求异常提示",
              center: true,
              duration: 2000
            });
          }
        } else {
          _this.$message.error({
            message: "与服务器通讯异常",
            center: true,
            duration: 2000
          });
        }
      });
    },
    search() {
      var _this = this;
      // if (_this.formData.uid == "") {
      //   return _this.$message.warning({
      //     message: "请输入玩家ID查询",
      //     center: true,
      //     duration: 2000
      //   });
      // }
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
      _this.pagedata.current = 1;
      _this.formData.limit = _this.pagedata.PageSize;
      _this.formData.skip =
        (_this.pagedata.current - 1) * _this.pagedata.PageSize;
      console.log("parm:", _this.formData);
      addUserMoneyLog(_this.formData).then(resp => {
        console.log("resp:", resp);
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            _this.tableData = resp.data.info.list;
            _this.pagedata.Total = resp.data.total.total;
          } else {
            _this.$message.error({
              message: resp.data.msg || "请求异常提示",
              center: true,
              duration: 2000
            });
          }
        } else {
          _this.$message.error({
            message: "与服务器通讯异常",
            center: true,
            duration: 2000
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pagedata.PageSize = parseInt(val);
    },
    handleCurrentChange(val) {
      this.pagedata.current = parseInt(val);
      this.init();
    },dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == "/audit/addMoneyList") {
      }
    }
  },
  mounted() {this.init();}
};
</script>
<style scoped lang="scss">
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
      margin-bottom: 15px;
    }
    .inputSize .el-input {
      width: 200px !important;
    }
  }
}
</style>