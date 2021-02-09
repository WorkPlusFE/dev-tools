<template>
  <div class="navigation">
    <div v-if="toggle" class="navigation-content">
      <i class="navigation-icon back el-icon-back" @click="handleBack"></i>
      <i class="navigation-icon back el-icon-right" @click="handleForward"></i>
      <i class="navigation-icon el-icon-refresh" @click="handleRefresh"></i>
      <i class="navigation-icon tools el-icon-setting" @click="handledevTools"></i>
      <i class="navigation-icon el-icon-s-fold" @click="handleToggleBar"></i>
    </div>
    <div v-else class="navigation-content is-shrink">
      <i class="navigation-icon el-icon-s-unfold" @click="handleToggleBar"></i>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require('electron');
import _ from 'lodash';
export default {
  name: 'navigation',
  data() {
    return {
      opendevtools: true,
      toggle: true,
    };
  },
  methods: {
    handleBack() {
      const winId = this.getCurrentWinId();
      ipcRenderer.send('route-back', winId);
    },
    handleForward() {
      const winId = this.getCurrentWinId();
      ipcRenderer.send('route-forward', winId);
    },
    handleRefresh() {
      const winId = this.getCurrentWinId();
      ipcRenderer.send('page-refresh', winId);
    },
    handledevTools() {
      this.opendevtools = !this.opendevtools;
      const winId = this.getCurrentWinId();
      if (this.opendevtools) {
        ipcRenderer.send('close-devtools', winId);
      } else {
        ipcRenderer.send('open-devtools', winId);
      }
    },

    getCurrentWinId() {
      const winId = _.get(this.$router, `history.current.query.winId`);
      return winId;
    },

    handleToggleBar() {
      this.toggle = !this.toggle;

      const winId = this.getCurrentWinId();
      ipcRenderer.send('toggle-bar', winId, this.toggle);
    },
  },
};
</script>

<style scoped lang='less'>
.navigation {
  z-index: 1000;
  .navigation-content {
    display: flex;
    .navigation-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(24, 140, 252, .4);
      font-size: 20px;
      width: 30px;
      height: 30px;
      color: #fff;
      cursor: pointer;
      border-right: 1px solid #fff;
      box-sizing: border-box;
      &:last-child {
        border-right: 0;
      }
      &:hover {
        font-weight: bold;
      }
    }
  }
  &:hover {
    * {
      background: rgba(24, 140, 252);
    }
  }
}
</style>