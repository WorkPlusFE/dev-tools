<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: '@w6s/dev-tools',
  };
</script>

<style>
  /* CSS */
  body{
    margin:0px;
  }
  .full_div{
    width: 100%;
    height: 100vh;
  }
  .defalut_bg{
    /* #07161C */
    background:rgb(20,20,20)
}
  .drag {
    -webkit-app-region: drag;
  }

  .no_dray {
      -webkit-app-region: no-drag;
  }
</style>
