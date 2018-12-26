<template>
  <div class="introduction">
    <div class="content-title">大区管理</div>
    <div class="inputSize">
      <el-input v-model="input" placeholder="请输入玩家id"></el-input>
      <el-button type="primary" @click="setFun">设为大区经理</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%">
      <el-table-column prop="uid" label="大区编号"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="mStatus" label="大区状态">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.mStatus==0?true:false">正常</el-button>
          <el-row v-if="scope.row.mStatus==1?true:false">已关闭</el-row>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="small"
            v-if="scope.row.mStatus==0?true:false"
            @click="enableFun(scope.row.uid)"
          >关闭大区经理</el-button>
          <el-button
            type="success"
            size="small"
            v-if="scope.row.mStatus==1?true:false"
            @click="enableFun2(scope.row.uid)"
          >还原大区经理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Region, setManager, enableManager } from "@/api/management";
import store from "@/store/index";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      input: ""
    };
  },
  methods: {
    init() {
      Region({ type: "leader" }).then(resp => {
        console.log("resp:", resp);
        var _this = this;
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            _this.tableData = resp.data.data;
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
    setFun() {
      var _this = this;
      if (_this.input == "") {
        return _this.$message.warning({
          message: "请输入玩家id",
          center: true,
          duration: 2000
        });
      }
      let param = { uid: "" };
      param.uid = this.input;
      param.type = "leader";
      setManager(param).then(resp => {
        console.log("resp: ", resp);
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            this.$message.success({
              message: "设置成功",
              center: true,
              duration: 2000
            });
            var _this = this;
            _this.init();
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
    enableFun(p) {
      this.$confirm("此操作将关闭大区经理, 是否继续?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let param = {
            accessToken: store.getters.token,
            uid: p,
            type: "leader",
            mStatus: 1
          };
          console.log("param", param);
          enableManager({ params: param }).then(resp => {
            if (resp.status == 200) {
              if (resp.data.code == 200) {
                this.$message.success({
                  message: "已关闭大区经理: " + param.uid,
                  center: true,
                  duration: 2000
                });
                var _this = this;
                _this.init();
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
        })
        .catch(() => {});
    },
    enableFun2(p) {
      let param = {
        accessToken: store.getters.token,
        uid: p,
        type: "leader",
        mStatus: 0
      };
      console.log("param", param);
      enableManager({ params: param }).then(resp => {
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            this.$message.success({
              message: "还原大区经理: " + param.uid,
              center: true,
              duration: 2000
            });
            var _this = this;
            _this.init();
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
  // activated() {
  //   const _this = this;
  //   _this.init();
  // },
  created() {
    var _this = this;
    _this.init();
  },
  watch: {
    $route(to, from) {
      console.log(to.path,from.path,"path___________")
      if (to.path == "/nested/menu1") {
        this.init();
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
    background-color: rgb(241, 240, 240);
    line-height: 40px;
    margin-bottom: 10px;
    padding-left: 5px;
  }
  .inputSize {
    margin-bottom: 15px;
  }
  .inputSize .el-input {
    width: 200px !important;
  }
}
</style>
