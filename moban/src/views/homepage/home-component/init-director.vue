<template>
  <div>
    <div class="homepage-container">大区总监</div>
    <div class>
      <el-table :data="tableData" border style="width:100%">
        <el-table-column align="center" prop="weekIncome" label="本周业绩"></el-table-column>
        <el-table-column align="center" prop="money" label="金币余额"></el-table-column>
        <el-table-column align="center" prop="lockMoney" label="保险箱余额"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import { getHomemanage } from "@/api/homepage";
let moment = require("moment");
export default {
  components: {},
  data() {
    return {
      suData:{},
      tableData: [],
      formData: {
        // uid: store.getters.uid,
        // date: moment().format("YYYY-MM-DD")
      }
    };
  },
  methods: {
    init() {
      var _this = this;
      getHomemanage(_this.formData).then(resp => {
        console.log('getHomemanage resp:',resp)
        if (resp.status == 200) {
          if (resp.data.code == 200) {
          var list=resp.data.data;
          _this.tableData=[];
          _this.tableData.push(list)
          // _this.tableData=list;
            // console.log(_this.tableData,'_this.tableData')
            // getHomeTotal({}).then(resp => {
            //   console.log('getHomeTotal resp:', _this.tableData[0])
            //   if (resp.status == 200) {
            //     if (resp.data.code == 200) {
            //       _this.suData.sum=resp.data.sum
            //        _this.tableData.push(_this.suData)
            //     }else {
            //       this.$message.error({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
            //     }
            //   }else{
            //     this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
            //   }
            // });
          }else {
            this.$message.error({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
          }
        }else{
          this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
        }
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
<style scoped lang="scss">
.home-total {
  width: 100%;
  min-width: 800px;
  height: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 0 15px 0;
  .home-total-item {
    box-sizing: border-box;
    display: inline-block;
    width: 25%;
    height: 100%;
    padding: 15px 0;
    vertical-align: top;
    .wrapper-item {
      height: 100%;
      padding: 0 20px;
      border-right: 1px solid #ccc;
      text-align: center;
      .title {
        margin: 0px 0;
      }
      .value {
        margin: 5px 0;
        font-size: 26px;
      }
    }
    &:last-child {
      .wrapper-item {
        border: none;
      }
    }
  }
}
</style>