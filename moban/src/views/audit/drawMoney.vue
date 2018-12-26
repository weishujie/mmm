<template>
  <div class="introduction">
    <div class="content-title">提现审批</div>
    <el-table :data="tableData" border style="width:100%">
      <el-table-column prop="id" label="审批单号"></el-table-column>
      <el-table-column prop="uid" label="用户ID"></el-table-column>
      <el-table-column prop="num" label="提现金额"></el-table-column>
      <el-table-column prop="account_name" label="收款人"></el-table-column>
      <el-table-column prop="account_number" label="收款账号"></el-table-column>
      <el-table-column prop="type" label="所属银行"></el-table-column>
      <el-table-column prop="dayId" label="申请时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="doSetOk(scope.row.id)">同意</el-button>
          <el-button type="text" @click="doSetNo(scope.row.id)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getOrders, setOk, setNo } from "@/api/management";
import store from "@/store/index";
export default {
  directives: {},
  data() {
    return {
      select: "first",
      tableData: [],
      formData: { uid: "", start: "", end: "" }
    };
  },
  methods: {
    init() {
      var _this = this;
      console.log("parm:", _this.formData);
      getOrders(_this.formData).then(resp => {
        console.log("resp:", resp);

        if (resp.status == 200) {
          if (resp.data.code == 200) {
            var list = resp.data.data;
            _this.tableData = [];
            list.forEach(itme => {
              _this.tableData.push({
                id: itme.id,
                uid: itme.uid,
                num: itme.body.amount,
                account_name: itme.body.account_name,
                account_number: itme.body.account_number,
                type: itme.body.bank_name,
                dayId: itme.timestamp
              });
            });
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
    doSetOk(id) {
      var _this = this;
      _this
        .$confirm("确认同意吗?同意后资金将转入对方账户", "系统提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
        .then(() => {
          let parm = { orderId: id };
          console.log("parm:", parm);
          setOk(parm).then(resp => {
            console.log("resp:", resp);
            if (resp.status == 200) {
              if (resp.data.code == 200) {
                _this.$message.success({
                  message: "订单: " + parm.orderId + "审核通过",
                  center: true,
                  duration: 2000
                });
                _this.init();
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
        })
        .catch(() => {});
    },
    doSetNo(id) {
      var _this = this;
      _this
        .$confirm("此操作将取消该订单,驳回提现申请, 是否继续?", "系统提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
        .then(() => {
          let parm = {
            orderId: id,
            remark: "",
            accessToken: store.getters.token
          };
          console.log("parm:", parm);
          setNo({ params: parm }).then(resp => {
            console.log("resp:", resp);
            if (resp.status == 200) {
              if (resp.data.code == 200) {
                _this.$message.success({
                  message: "已取消订单: " + parm.orderId,
                  center: true,
                  duration: 2000
                });
                _this.init();
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
        })
        .catch(() => {});
    }
  },
  watch: {
    $route(to, from) {
      console.log(to.path, from.path, "path___________");
      if (to.path == "/audit/drawMoney") {
        this.init();
      }
    }
  },
  created() {
    this.init();
  }
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
    margin-bottom: 2px;
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