<template>
  <div id='app'>
    <router-view></router-view>
  </div>
  <!-- <router-view>
    <div id="app">
    <Sidebar/>
    <router-view></router-view>
    </div>
  </router-view> -->
  
</template>

<script>
import Sidebar from "@/components/Sidebar";
import { mapState } from 'vuex';
import { remote, ipcRenderer } from 'electron';

export default {
  name: 'dev-tools',
  components: {
    Sidebar,
  },
  computed: {
    ...mapState('Setting', ['dark', 'isZhCnLng'])
  },
  methods: {
    rendererListen() {
      ipcRenderer.on('open-select-contact', (event, arg, type) => {
        console.log(arg);
        this.$router.push({ path: '/selectcontact', query: { winId: arg, type } });
        ipcRenderer.send('show-center');
      })
    }
  },
  mounted() {
    this.$i18n.locale = this.isZhCnLng ? 'zh-CN' : 'en';
    remote.app.changeLanguage(this.$i18n.locale);

    if (this.dark) {
      document.getElementsByTagName("body")[0].setAttribute('data-theme', 'dark');
    } else {
        document.getElementsByTagName("body")[0].setAttribute('data-theme', 'light');
    }
    // this.rendererListen();
    console.log(this.$router)
    if(this.$router.history.current.name == 'navigation'){
      console.log('aa');
      document.getElementsByTagName("body")[0].setAttribute('style','background:transparent')
      document.getElementsByTagName("html")[0].setAttribute('style','background:transparent')
      document.getElementById('app').setAttribute('style','background:transparent');
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
