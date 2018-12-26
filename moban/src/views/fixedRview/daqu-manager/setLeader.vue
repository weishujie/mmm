<template>
  <div class="introduction">
    <div class="content-title">
      大区总监管理  
    </div>
    <div class="inputSize">
      <el-input v-model="input" placeholder="请输入代理id"></el-input>
      <el-button type="primary" @click="setFun">设为大区总监</el-button>
    </div>
    <el-table :data="tableData" border @cell-dblclick="dblclick" style="width: 100%">
      <el-table-column prop="uid" label="编号"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
       <el-table-column prop="mStatus" label="大区状态">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.mStatus==0?true:false">正常</el-button>
          <el-lable type="text" size="small" v-if="scope.row.mStatus==1?true:false">已关闭</el-lable>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-if="scope.row.mStatus==0?true:false"
            @click="enableFun(scope.row.uid)"
          >关闭大区总监</el-button>
          <el-button
            type="text"
            size="small"
            v-if="scope.row.mStatus==1?true:false"
            @click="enableFun2(scope.row.uid)"
          >还原大区总监</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Region,setManager,enableManager } from "@/api/management";
 import store from '@/store/index'
export default {
  components: {},
  data() {
    return {
      tableData: [],
      input: ""
    };
  },
  methods: {
    dblclick(row, column, cell, event){
      console.log(row, column, cell, event)
    },
    init() {
      Region({type:"manager"}).then(resp => {
        var _this = this;
        if (resp.status == 200) {
          if (resp.data.code == 200) {
             console.log("manager",resp.data)
            _this.tableData = resp.data.data;
          }else {
            this.$message.error({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
          }
        }else{
          this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
        }
      });
    },
    setFun() {
      var _this = this;
      let param = {uid:""};
      param.uid=this.input;
      if(!param.uid){this.$message.warning({message:"输入不能为空",center: true,duration:2000});return}
      param.type="manager";
      console.log("param:", param)
     setManager(param).then(resp => {
        console.log("param:", param,"resp:", resp);
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            this.$message.success({message: "设置成功",center: true,duration:2000});
            var _this = this;_this.init();
          }else {
            this.$message.error({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
          }
        }else{
          this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
        }
      });
    },
     enableFun(p) {
       console.log(p,"ppaa")
      this.$confirm("此操作将关闭大区总监, 是否继续?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        let param = {accessToken: store.getters.token,uid: p,type:"manager",mStatus:1 };
        console.log("param", param);
        enableManager({params:param}).then(resp => {
          console.log(resp,'fff')
          if (resp.status == 200) {
            if (resp.data.code == 200) {
              this.$message.success({message: '已关闭大区总监: '+ param.uid,center: true,duration:2000});
              var _this = this;_this.init();
            }else {
              this.$message.error({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
            }
          }else{
            this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
          }
        });
      }).catch(() => {});
    },
    enableFun2(p) {
      let param = {
        accessToken: store.getters.token,
        uid: p,
        type: "manager",
        mStatus: 0
      };
      console.log("param", param);
      enableManager({ params: param }).then(resp => {
        if (resp.status == 200) {
          if (resp.data.code == 200) {
            this.$message.success({message: '还原大区总监: '+ param.uid,center: true,duration:2000});
            var _this = this;_this.init();
          }else {
            this.$message.error({message: resp.data.msg||'请求异常提示',center: true,duration:2000});
          }
        }else{
          this.$message.error({message: '与服务器通讯异常',center: true,duration:2000});
        }
      });
    }
    // enableFun(p) {
    //   console.log("p", p);
    //   let param = {accessToken: store.getters.token, uid: p ,type:"leader"};
    //   console.log("param", param);
    //   enableManager({params:param}).then(resp => {
    //     if (resp.status == 200) {
    //       alert("已关闭大区总监: " + param.uid);
    //       var _this = this;
    //       _this.init();
    //     }
    //   });
    // }
  },
  created() {
    var _this = this;
    _this.init();
  },
   watch: {
    $route(to, from) {
      // console.log(to.path,from.path,"path___________")
      if (to.path == "/daqu-manager/setLeader") {
        this.init()
      }
    }
  },
  mounted() {},
};
</script>
<style>
.inputSize {
  /* float: right; */
  margin-bottom: 20px;
}
.inputSize .el-input {
  width: 200px !important;
}
</style>

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
