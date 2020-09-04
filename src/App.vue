<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import waitGlobal from "./tronweb";
export default {
  mounted() {
    window.onload = function() {
      waitGlobal()
    }
  }
}
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
