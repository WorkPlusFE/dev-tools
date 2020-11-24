<template>
  <div class="main_left">
    <div class="logo drag">
      <img class="dark-logo" src="../assets/images/w-logo.jpg" alt="logo">
      <img class="light-logo" src="../assets/images/w-logo-light.jpg" alt="logo">
    </div>
    <div class="content">
      <div class="icon_content">
        <div
          :class="{
            icon: true,
            'el-icon-menu': true,
            tab: currentTab == 'app',
          }"
          title="应用"
          @click="handleTab('app')"
        ></div>
        <div
          :class="{
            icon: true,
            'el-icon-s-custom': true,
            tab: currentTab == 'role',
          }"
          title="角色"
          @click="handleTab('role')"
        ></div>
        <div
          :class="{
            icon: true,
            'el-icon-s-tools': true,
            tab: currentTab == 'setting',
          }"
          title="设置"
          @click="handleTab('setting')"
        ></div>
      </div>
      <div class="icon_content">
        <div class="icon el-icon-switch-button logout" title="退出"></div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '@/eventBus.js';

export default {
  components: {},
  props: {
    currentTab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleTab(key) {
      eventBus.$emit('CHANGE_TAB', key);
    },
  },
};
</script>
<style lang='less' scoped>
@sidebar-width: 50px;
@logo-size: 25px;

.main_left {
  width: @sidebar-width;
  height: 100vh;
  background: var(--sidebar-bg-color);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  .logo {
    width: 100%;
    height: 60px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    img {
      width: @logo-size;
      height: @logo-size;
    }
  }
  .content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 10px;
    .icon_content {
      width: 100%;
      .icon {
        width: 100%;
        height: @sidebar-width - 10px;
        color: var(--icon-color);
        line-height: @sidebar-width - 10px;
        text-align: center;
        font-size: 24px;
        cursor: pointer;
        margin: 5px 0;
        box-sizing: border-box;
        &:hover {
          color: var(--icon-color-actived);
        }
      }
      .logout {
        &:hover {
          color: var(--icon-color-red);
        }
      }
      .tab {
        color: var(--icon-color-actived);
        border-left: 2px solid var(--icon-color-actived);
        text-indent: -2px;
      }
    }
  }
}

[data-theme="light"] {
  .dark-logo {
    display: none;
  }

  .light-logo {
    display: block;
  }
}

[data-theme="dark"] {
  .dark-logo {
    display: block;
  }

  .light-logo {
    display: none;
  }
}
</style>