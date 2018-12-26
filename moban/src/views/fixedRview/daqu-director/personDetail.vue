<template>
  <div class="introduction">
    <div class="content-title">个人信息管理</div>
    <el-row class="boderRow">
      <el-col>
        <div>
          <span class="fright">昵称:</span>
          {{nickname}}
        </div>
      </el-col>
    </el-row>
    <el-row class="boderRow">
      <el-col>
        <div>
          <span class="fright">ID号:</span>
          {{uid}}
        </div>
      </el-col>
    </el-row>
    <el-row class="boderRow">
      <el-col>
        <div>
          <span class="fright">余额:</span>
          {{money}}
        </div>
      </el-col>
    </el-row>
    <el-row class="boderRow">
      <el-col>
        <div>
          <span class="fright">手机:</span>
          <el-input v-model="mobile" class="inputCls">
            <el-button slot="append" class="iconCls" icon="el-icon-edit" @click="mobilePut(mobile)"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="boderRow">
      <el-col>
        <div>
          <span class="fright">上级:</span>
          {{parent}}
        </div>
      </el-col>
    </el-row>
    <el-row class="boderRow">
      <el-col>
        <div>
          <span class="fright">大区:</span>
          {{aeraid}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getPlayerInfo, userput } from "@/api/management";
import store from "@/store/index";
export default {
  components: {},
  data() {
    return {
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
      getPlayerInfo({ uid: store.getters.uid }).then(resp => {
        console.log("resp:", resp);
        
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            _this.nickname = unescape(
              resp.data.data.nickname.replace(/\\/g, "%")
            );
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
    },
    mobilePut(id) {
       var _this = this;
      if (!id) {
        _this.$message.warning({
          message: "输入不能为空",
          center: true,
          duration: 2000
        });
        return;
      }
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (!reg.test(id)) {
        _this.$message.warning({
          message: "输入正确的手机号",
          center: true,
          duration: 2000
        });
        return;
      }
      _this
        .$confirm("将修改手机号为：" + _this.mobile, "系统提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
        .then(() => {
          let parm = { mobile: id };
          userput(parm).then(resp => {
            console.log("resp:", resp);
            if (resp.status == 200) {
              if (resp.data.code == 200) {
                _this.$message.success({
                  message: "修改成功",
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
  created() {
   this.init();
  }
};
</script>
<style scoped lang="scss">
.introduction {
  padding: 20px 10px;
  padding-bottom: 300px;
  overflow: hidden;
  .content-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: rgb(241, 240, 240);
    margin-bottom: 10px;
    padding-left: 10px;
  }
}
.fright {
  text-align: right;
  padding-right: 10px;
}
.boderRow {
  height: 40px;
  line-height: 40px;
  border-bottom: solid 1px #eee;
  display: flex;
}
.inputCls {
  width: 180px;
  flex: 1;
   border: 0;
}
</style>
