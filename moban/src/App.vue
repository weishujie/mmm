<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import 'normalize.css/normalize.css';
  @import './style/index.css';
  @import './style/custom.css';
  body,html{
  width:100%;
  height:100%;
}
#app{
  width:100%;
  height:100%;
  overflow: hidden;
}
</style>
