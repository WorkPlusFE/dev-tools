<template>
  <div id="app">
    <Sidebar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import { mapState } from 'vuex';

export default {
  name: 'dev-tools',
  components: {
    Sidebar,
  },
  computed: {
    ...mapState('setting',['dark','isZhCnLng'])
  },
  mounted() {
    this.$i18n.locale = this.isZhCnLng ? 'zh-CN' : 'en';
    if(this.dark){
      document.getElementsByTagName("body")[0].setAttribute('data-theme', 'dark');
    }else{
        document.getElementsByTagName("body")[0].setAttribute('data-theme', 'light');
    }
  
  }
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

ul,
li,
h3,
p {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100vh;
  display: flex;
  background: var(--bg-color);
  font-size: var(--text-font-size);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
