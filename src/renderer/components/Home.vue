<template>
  <div class="home full_div noselect">
    <MainLeft :currentTab="currentTab"></MainLeft>
    <MainView v-show="currentTab == 'app'"/>
    <MainRole v-show="currentTab == 'role'"/>
  </div>
</template>
<script>
const { shell } = require('electron');
import eventBus from '@/eventBus.js';
const { ipcRenderer } = require('electron');
import MainLeft from '@/components/MainLeft.vue';
import MainView from '@/components/MainView.vue';
import MainRole from '@/components/MainRole.vue';
import AddApp from '@/components/app/AddApp.vue';
export default {
  components: {MainLeft,MainView,MainRole,AddApp},
  name: 'home',
  data() {
    return {
      currentTab:'app',
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
    eventBus.$on('CHANGE_TAB',(arg)=>{
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