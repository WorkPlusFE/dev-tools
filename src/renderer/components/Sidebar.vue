<template>
  <div class="sidebar">
    <div class="logo drag">
      <img class="dark-logo" src="../assets/images/w-logo.jpg" alt="logo" />
      <img
        class="light-logo"
        src="../assets/images/w-logo-light.jpg"
        alt="logo"
      />
    </div>
    <div class="menus">
      <div class="menus__base">
        <router-link
          :class="{
            icon: true,
            'el-icon-menu': true,
          }"
          exact
          :title="$t('sidebar.app')"
          to="/"
        ></router-link>
        <router-link
          :class="{
            icon: true,
            'el-icon-s-custom': true,
          }"
          :title="$t('sidebar.role')"
          :to="'role'"
        ></router-link>
        <router-link
          :class="{
            icon: true,
            'el-icon-s-tools': true,
            'router-link-active': settingRouteActive,
          }"
          :title="$t('sidebar.setting')"
          exact
          :to="'setting'"
        ></router-link>
      </div>
      <div class="menus__base">
        <el-popconfirm
          :confirm-button-text="$t('sidebar.popconfirm.del')"
          :cancel-button-text="$t('sidebar.popconfirm.cancel')"
          :title="$t('sidebar.popconfirm.title')"
          @confirm="handleExit"
        >
          <div
            class="icon el-icon-switch-button logout"
            slot="reference"
            :title="$t('sidebar.logout')"
          ></div>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
const { remote, ipcRenderer, shell } = window.require('electron');
export default {
  name: 'Sidebar',
  computed: {
    settingRouteActive() {
      const path = this.$route.path;
      return path === '/setting' || path === '/params';
    },
  },
  methods: {
    handleExit() {
      const app = require('electron').remote.app;
      app.exit();
    }
  },
};
</script>

<style lang='less' scoped>
@sidebar-width: 50px;
@logo-size: 25px;

.sidebar {
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
  .menus {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 10px;
    &__base {
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
        text-decoration: none;
        &:hover {
          color: var(--icon-color-actived);
        }
      }
      .logout {
        &:hover {
          color: var(--icon-color-red);
        }
      }
      .router-link-active {
        color: var(--icon-color-actived);
        border-left: 2px solid var(--icon-color-actived);
        text-indent: -2px;
      }
    }
  }
}

[data-theme='light'] {
  .dark-logo {
    display: none;
  }

  .light-logo {
    display: block;
  }
}

[data-theme='dark'] {
  .dark-logo {
    display: block;
  }

  .light-logo {
    display: none;
  }
}
</style>