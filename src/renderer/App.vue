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

<style lang="less">
@import './assets/styles/root.less';

/* CSS */
html,
body {
  margin: 0;
  padding: 0;
  background: var(--bg-color);
}
h3,
p {
  margin: 0;
}

#app {
  width: 100%;
  height: 100vh;
  background: var(--bg-color);
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
