<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'dev-tools',
};
</script>

<style>
/* CSS */
body {
  margin: 0px;
}
#app {
  width: 100%;
  height: 100vh;
}

.drag {
  -webkit-app-region: drag;
}

.no_dray {
  -webkit-app-region: no-drag;
}

.noselect {
  user-select: none;
}

</style>
