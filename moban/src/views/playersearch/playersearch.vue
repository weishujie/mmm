<template>
  <div class="introduction">
    <div class="content-title">玩家房费记录</div>
    <div class="block">
      <div class="inputSize">
        <el-date-picker v-model="formData.start" type="date" placeholder="选择开始日期"></el-date-picker>
        <el-date-picker v-model="formData.end" type="date" placeholder="选择结束日期"></el-date-picker>
        <el-input v-model="formData.uid" placeholder="请输入玩家id"></el-input>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>
    <el-tabs v-model="select">
      <el-tab-pane label="房费记录" name="first">
        <el-table :data="tablegameRecordsData" border style="width: 100%">
          <el-table-column prop="uid" label="玩家ID"></el-table-column>
          <el-table-column prop="tableId" label="桌号"></el-table-column>
          <el-table-column prop="num" label="房费"></el-table-column>
          <el-table-column prop="dateTime" label="时间" :formatter="dateFormat"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagedata.current"
          :page-sizes="[10, 20, 30, 40,50,100]"
          :page-size="pagedata.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagedata.gameRecordsTotal"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="购买记录" name="second">
        <el-table :data="tablepaymentRecordsData" border style="width: 100%">
          <el-table-column prop="uid" label="玩家ID"></el-table-column>
          <el-table-column prop="giveNum" label="购买数量"></el-table-column>
          <el-table-column prop="rmbAmount" label="支付人民币(元)"></el-table-column>
          <el-table-column prop="num" label="金币余额"></el-table-column>
          <el-table-column prop="dateTime" label="时间" :formatter="dateFormat"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagedata.current"
          :page-sizes="[10, 20, 30, 40,50,100]"
          :page-size="pagedata.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagedata.paymentRecordsTotal"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="小游戏充值记录" name="third">
        <el-table :data="tablesmallGameData" border style="width: 100%">
          <el-table-column prop="from" label="操作者"></el-table-column>
          <el-table-column prop="to" label="玩家ID"></el-table-column>
          <el-table-column prop="num" label="金额"></el-table-column>
          <el-table-column prop="dateTime" label="时间" :formatter="dateFormat"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagedata.current"
          :page-sizes="[10, 20, 30, 40,50,100]"
          :page-size="pagedata.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagedata.smallGameTotal"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { SearchPlayer } from "@/api/management";
let moment = require("moment");
export default {
  directives: {},
  data() {
    return {
      select: "first",
      tablegameRecordsData: [],
      tablepaymentRecordsData: [],
      tablesmallGameData: [],
      formData: {
        uid: "",
        start:moment().subtract(7,'days').format('YYYY-MM-DD'),
        end:moment().format('YYYY-MM-DD'),
        limit: 20,
        skip: 0
      },
      pagedata: {
        current: 1,
        PageSize: 20,
        gameRecordsTotal: 0,
        paymentRecordsTotal: 0,
        smallGameTotal: 0
      }
    };
  },
  methods: {
    init() {
      var _this = this;
      _this.formData.limit = _this.pagedata.PageSize;
      _this.formData.skip =
        (_this.pagedata.current - 1) * _this.pagedata.PageSize;
      console.log("_this.formData", _this.formData);
      SearchPlayer(_this.formData).then(resp => {
        console.log("resp", resp);
        if (resp.status == 200) {
          var gameRecordsList = resp.data.info.gameRecordsList;
          var paymentRecordsList = resp.data.info.paymentRecordsList;
          var smallGameList = resp.data.info.smallGameList;
          _this.tablegameRecordsData = gameRecordsList;
          _this.tablepaymentRecordsData = paymentRecordsList;
          _this.tablesmallGameData = smallGameList;
          _this.pagedata.gameRecordsTotal = resp.data.total.gameRecordsTotal;
          _this.pagedata.paymentRecordsTotal =
            resp.data.total.paymentRecordsTotal;
          _this.pagedata.smallGameTotal = resp.data.total.smallGameTotal;
        }
      });
    },
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
      _this.pagedata.current = 1;
      _this.formData.limit = _this.pagedata.PageSize;
      _this.formData.skip =
        (_this.pagedata.current - 1) * _this.pagedata.PageSize;
      console.log("_this.formData", _this.formData);
      SearchPlayer(_this.formData).then(resp => {
        console.log("resp", resp);
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            var gameRecordsList = resp.data.info.gameRecordsList;
            var paymentRecordsList = resp.data.info.paymentRecordsList;
            var smallGameList = resp.data.info.smallGameList;
            _this.tablegameRecordsData = gameRecordsList;
            _this.tablepaymentRecordsData = paymentRecordsList;
            _this.tablesmallGameData = smallGameList;
            _this.pagedata.gameRecordsTotal = resp.data.total.gameRecordsTotal;
            _this.pagedata.paymentRecordsTotal =
              resp.data.total.paymentRecordsTotal;
            _this.pagedata.smallGameTotal = resp.data.total.smallGameTotal;
          } else if (resp.data.code == 404) {
            _this.$message.warning({
              message: resp.data.msg || "查无该玩家信息",
              center: true,
              duration: 2000
            });
          }
        } else {
          _this.$message.error({
            message: "请求服务器通讯出错",
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
      var _this = this;
      _this.init();
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      if (to.path == "/playersearch/playersearch") {
        this.init();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  margin-top: 20px;
}
.inputSize .el-input {
  width: 200px !important;
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