<template>
  <div class="home noselect">
    <MainLeft :currentTab="currentTab"></MainLeft>
    <MainView v-show="currentTab == 'app'"/>
    <MainRole v-show="currentTab == 'role'"/>
  </div>
</template>
<script>
import eventBus from '@/eventBus.js';
import MainLeft from '@/components/MainLeft.vue';
import MainView from '@/components/MainView.vue';
import MainRole from '@/components/MainRole.vue';
import AddApp from '@/components/app/AddApp.vue';
const { shell } = require('electron');
const { ipcRenderer } = require('electron');
export default {
  components: {
 MainLeft, MainView, MainRole, AddApp
},
  name: 'home',
  data() {
    return {
      currentTab: 'app',
    };
  },
  methods: {
    closeApp() {
      ipcRenderer.send('CLOSEAPP');
    }
  },
  beforeCreate() {
  },
  created() {
    eventBus.$on('CHANGE_TAB', (arg) => {
      this.currentTab = arg;
    })
  }
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
}
</style>