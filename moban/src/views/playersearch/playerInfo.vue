<template>
  <div class="introduction">
    <div class="content-title">玩家信息</div>
    <div class="block">
      <div class="inputSize">
        <el-input v-model="formData.uid" placeholder="请输入玩家id"></el-input>
        <el-button type="primary" @click="init">查询</el-button>
      </div>
    </div>
    <article class="info" v-if="seen">
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
    </article>
  </div>
</template>
<script>
import { getPlayerInfo } from "@/api/management";
export default {
  components: {},
  data() {
    return {
      seen: false,
      formData: { uid: "" },
      nickname: "",
      uid: "",
      mobile: "",
      parent: "",
      aeraid: "",
      money: 0
    };
  },
  methods: {
    init() {
      var _this = this;
      getPlayerInfo(_this.formData).then(resp => {
        if (_this.formData.uid == "") {
          return _this.$message.warning({
            message: "输入ID不能为空",
            center: true,
            duration: 2000
          });
        }
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
.info {
  margin-top: 22px;
  border-top: solid 1px #ddd;
  font-size: 18px;
}
.info ul li {
  list-style-type: none;
  padding: 22px 0;
  border-bottom: solid 1px #eee;
  width: 98%;
  margin: auto;
}
.info ul li .left {
  float: left;
  padding: 0 15px;
  position: relative;
  text-align: left;
  color: #999;
}
.info ul li .right {
  float: left;
  position: relative;
  text-align: left;
}
</style>
