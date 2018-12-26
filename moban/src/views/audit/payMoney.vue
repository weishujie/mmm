<template>
  <div class="introduction">
    <div class="content-title">后台金币充值</div>
    <div class="block">
      <div class="inputArea">输入玩家id
        <br/>
        <el-input v-model="formData.uid" placeholder="输入玩家id">
          <el-button slot="append" class="iconCls" icon="el-icon-search" @click="showPlayerInfo"></el-button>
        </el-input><br/>
      </div>
      <div class="inputArea">输入充值金额
        <br/>
        <el-input type="number" v-model="formData.buyNum" placeholder="输入充值金额"></el-input>
      </div>
      <div class="inputArea">
        <el-button type="primary" class="btnCls" @click="FunAddMoney">充值</el-button>
      </div>
    </div>
    <el-popover placement="right" width="600" trigger="manual" v-model="visible">
      <div class="">玩家信息
        <div style="float:right">
          <el-button size="mini" @click="visible = false">关闭</el-button>
        </div>
      </div>
      <div class="info">
        <ul>
          <li>
            <div class="left">昵称:</div>
            <div class="right">{{nickname}}</div>
            <div class="clear"></div>
          </li>
          <li>
            <div class="left">ID号:</div>
            <div class="right">{{uid}}</div>
            <div class="clear"></div>
          </li>
          <li>
            <div class="left">余额:</div>
            <div class="right">{{money}}</div>
            <div class="clear"></div>
          </li>
          <li>
            <div class="left">手机:</div>
            <div class="right">{{mobile}}</div>
            <div class="clear"></div>
          </li>
          <li>
            <div class="left">上级:</div>
            <div class="right">{{parent}}</div>
            <div class="clear"></div>
          </li>
          <li>
            <div class="left">大区:</div>
            <div class="right">{{aeraid}}</div>
            <div class="clear"></div>
          </li>
        </ul>
      </div>
    </el-popover>
  </div>
</template>
<script>
import { addUserMoney, getPlayerInfo } from "@/api/management";
import store from "@/store/index";
export default {
  directives: {},
  data() {
    return {
      visible: false,
      tableData: [],
      formData: { uid: "", buyNum: "",type:2 },
      nickname: "",
      uid: "",
      mobile: "",
      parent: "",
      aeraid: "",
      money: 0
    };
  },
  methods: {
    FunAddMoney() {
      var _this = this;
      if (_this.formData.uid == "") {
        return _this.$message.warning({
          message: "请输入玩家ID",
          center: true,
          duration: 2000
        });
      } else if (_this.formData.buyNum == "") {
        return _this.$message.warning({
          message: "请输入金额",
          center: true,
          duration: 2000
        });
      }else if (_this.formData.buyNum<=0) {
        return _this.$message.warning({
          message: "请输入正确的金额",
          center: true,
          duration: 2000
        });
      }
      _this
        .$confirm("确认给" + _this.formData.uid + "充值吗？", "系统提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
        .then(() => {
          console.log("parm:", _this.formData);
          addUserMoney(_this.formData).then(resp => {
            console.log("resp:", resp);
            if (resp.status == 200) {
              if (resp.data.code == 200) {
                _this.visible = false;
                _this.$message.success({
                  message: "充值成功",
                  center: true,
                  duration: 2000
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
        })
        .catch(() => {});
    },
    showPlayerInfo() {
      var _this = this;
      if (_this.formData.uid == "") {
        return _this.$message.warning({
          message: "输入ID不能为空",
          center: true,
          duration: 2000
        });
      }
      _this.visible = true;
      getPlayerInfo(_this.formData).then(resp => {
        console.log("resp:", resp);
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            (_this.seen = true),
              (_this.nickname = unescape(
                resp.data.data.nickname.replace(/\\/g, "%")
              ));
            _this.uid = resp.data.data.uid;
            _this.mobile = resp.data.data.mobile || "未绑定";
            _this.parent = unescape(resp.data.data.parent) || "无";
            _this.aeraid = unescape(resp.data.data.aeraid) || "无";
            _this.money = unescape(resp.data.data.money) || 0;
          } else if (resp.data.code == 404) {
            _this.$message.warning({
              message: resp.data.msg || "暂无该玩家信息",
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
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == "/audit/addMoney") {
      }
    }
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
    background-color: rgb(240, 240, 241);
    line-height: 40px;
    margin-bottom: 2px;
    padding-left: 5px;
  }
  .block {
    .inputArea {
      margin: 15px;
    }
    .inputArea .el-input {
      width: 270px !important;
    }
    // .inputArea .iconCls {
    //   width: 40px !important;
    // }
    .inputArea .btnCls {
      width: 270px !important;
      margin: 0 auto;
    }
  }
}
.info {
  margin-top: 22px;
  border-top: solid 1px #ddd;
  font-size: 18px;
}
.info ul li {
  list-style-type: none;
  padding: 22px 0;
  border-bottom: solid 1px #eee;
  margin: auto;
}
.info ul li .left {
  float: left;
  padding: 0 15px;
  position: relative;
  color: #999;
}
.info ul li .right {
  float: left;
  position: relative;
}
</style>
