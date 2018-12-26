<template>
  <div class="introduction">
     <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      tableData: [],
      input: ""
    }
  }
};
</script>
<style scoped lang="scss">
.inputSize { margin-bottom: 20px;}
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
}
</style>
