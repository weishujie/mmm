<template>   
    <Merchantlog/>
</template>
<script>
import  Merchantlog from '@/views/rizhi/merchantlog'

export default {
  components: {
    Merchantlog
  },
  data() {
    return {
      tableData: [{}],
      input: ""
    }
  },
  methods: {},
  created() {},
  mounted() {}
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
