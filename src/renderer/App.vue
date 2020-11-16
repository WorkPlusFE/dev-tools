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
  .noselect{

    -webkit-user-select:none;

     -moz-user-select:none;

     -ms-user-select:none;

     user-select:none;

}
::-webkit-scrollbar{
        width: 4px;
        background-color:transparent;
        display: block;
    }

::-webkit-scrollbar-thumb{
        border-radius: 4px;
        background-color: #9e9b9b;
  }

::-webkit-scrollbar-track{
        background-color: transparent;
}
</style>
