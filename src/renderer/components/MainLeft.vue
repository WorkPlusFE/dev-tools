<template>
  <div class="main_left">
    <div class="logo el-icon-box drag"></div>
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
        <div class="icon el-icon-switch-button" title="退出"></div>
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

@icon-color: #6E7179;
@icon-color-actived: #D7DAE0;
@sidebar-width: 50px;

.main_left {
  width: @sidebar-width;
  height: 100vh;
  background: #282C34;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #1d1f23;
  .logo {
    width: 100%;
    height: 72px;
    line-height: 62px;
    text-align: center;
    font-size: 28px;
    color: rgb(5, 95, 247);
    flex-shrink: 0;
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
        color: @icon-color;
        line-height: @sidebar-width - 10px;
        text-align: center;
        font-size: 24px;
        cursor: pointer;
        margin: 5px 0;
        box-sizing: border-box;
        &:hover {
          color: @icon-color-actived;
        }
      }
      .tab {
        color: @icon-color-actived;
        border-left: 2px solid @icon-color-actived;
        text-indent: -2px;
      }
    }
  }
}
</style>