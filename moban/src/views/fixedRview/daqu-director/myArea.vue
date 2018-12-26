<template>
  <div class="introduction">
      <div class="content-title">   
        我的大区     
        <!-- <el-row type="flex" class="row-bg">
        <el-col :span="9"><div class="grid-content bg-purple">本周业绩:</div>{{sum}}</el-col>
      </el-row> -->
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="uid" label="ID"></el-table-column>
        <el-table-column prop="num" label="业绩"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pagedata.current"
        :page-sizes="[10, 20, 30, 40,50,100]"
        :page-size="pagedata.PageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pagedata.Total">
      </el-pagination>
  </div>
</template>
<script>
import { getmyDaqu } from "@/api/management";
import store from '@/store/index'
export default {
  directives: {},
  data() {
    return {
      sum:0,
      tableData: [],
      formData:{limit:20,skip:0},
      pagedata:{current:1,PageSize:20,Total:0}
    }
  },
  methods: {
    init() {
      this.formData.limit=this.pagedata.PageSize
      this.formData.skip=(this.pagedata.current-1)*this.pagedata.PageSize
      getmyDaqu(this.formData).then(resp => {
         console.log("this.formData:",resp)
        var _this = this;
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            _this.tableData =resp.data.data;
            _this.pagedata.Total=resp.data.total;
            // var paymentRecordsList = resp.data.info.paymentRecordsList;
            // var smallGameList = resp.data.info.smallGameList;
          }else {
            this.$message.error({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
          }
        }else{
          this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
        }
      });
    },
    handleSizeChange(val) {
      this.pagedata.PageSize=parseInt(val);
    },
    handleCurrentChange(val) {
      this.pagedata.current=parseInt(val);
      var _this = this; _this.init();
    },
    
  },
  created() {var _this = this;_this.init();},
  watch: {
    $route(to, from) {
      // console.log(to.path,from.path,"path___________")
      if (to.path == "/daqu-manager/myArea") {
        this.init()
      }
    }
  }
};
</script>
<style scoped lang="scss">
.title {margin-top: 20px;}
.inputSize .el-input {width: 200px !important;}
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
   .block{
     .inputSize{
       margin-bottom: 10px;
     }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      margin-bottom: 10px;
    }
  }
}
</style>