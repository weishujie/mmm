<template>
  <div class="introduction">
    <div class="content-title">排行榜设置</div>
    <el-button type="text" size="small" @click="setbtn">设置</el-button>
    <el-table :data="tableData" border style="width:100%">
      <el-table-column type="index" label="设定排名" width="300"></el-table-column>
      <el-table-column prop="rk" label="原排名" width="300"></el-table-column>
      <el-table-column prop="uid" label="用户id" width="300"></el-table-column>
      <el-table-column label="操作" width="328">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-arrow-up"
            :disabled="scope.$index === 0"
            @click="upFieldOrder(scope.$index)"
          >上移</el-button>
          <el-button
            icon="el-icon-arrow-down"
            :disabled="scope.$index === tableData.length - 1"
            @click="downFieldOrder(scope.$index)"
          >下调</el-button>
          <!-- <el-button type="text" size="small">下调</el-button> -->
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Setboard, setput } from "@/api/settingmeg";
import store from "@/store/index";
export default {
  components: {},
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    // s上移
    upFieldOrder(index) {
      var _this = this;
      let temp = _this.tableData[index - 1];
      _this.$set(_this.tableData, index - 1, _this.tableData[index]);
      _this.$set(_this.tableData, index, temp);
    },
    // 下移
    downFieldOrder(index) {
      var _this = this;
      let i = _this.tableData[index + 1];
      _this.$set(_this.tableData, index + 1, _this.tableData[index]);
      _this.$set(_this.tableData, index, i);
    },
    setbtn() {
      let param = {
        data: []
      };
      this.tableData.forEach((dataItem, index) => {
        param.data.push({
          rk: dataItem.rk,
          uid: dataItem.uid
          // "rk": index
        });
      });
      // 调用后台，并传入 param
      setput(param).then(resp => {
        if (resp.status == 200) {
            if (resp.data.code == 200) {
              this.$message.success({
                message: "设置成功",
                center: true,
                duration: 2000
              });
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

    handleClick(row) {
      console.log(row);
    }
  },
  created() {
    Setboard().then(resp => {
      var _this = this;
      // console.log(window.localStorage.getItem("checkarr"))
      if (resp.status == 200) {
        if (resp.data.code == 200) {
          var list = resp.data.data;
          console.log("data:",resp.data.data);
          _this.tableData = list;
          // console.log(resp,"kkk");
        }else {
          this.$message.error({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
        }
      }else{
        this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
      }
    });
  },
  destroyed() {},
  mounted() {}
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
}
</style>
