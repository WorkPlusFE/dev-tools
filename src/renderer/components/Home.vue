<template>
  <div class="home full_div">
    <MainLeft></MainLeft>
    <MainView></MainView>
  </div>
</template>
<script>
const { shell } = require('electron');
const { ipcRenderer } = require('electron');
import MainLeft from '@/components/MainLeft.vue';
import MainView from '@/components/MainView.vue';
export default {
  components: {MainLeft,MainView},
  name: 'home',
  data() {
    return {
    };
  },
  methods: {
    closeApp() {
      ipcRenderer.send('CLOSEAPP');
    }
  },
  beforeCreate() {
  }
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
}
</style>