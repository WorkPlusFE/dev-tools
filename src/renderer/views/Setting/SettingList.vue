<template>
  <div class="main_view">
    <TitleBar titleText="设置" />
    <div class="main_content">
      <ul class="settings">
        <li class="setting-item" @click="handleGoParamsSettingPage">
          <div class="setting-item__content">
            <p>参数设置</p>
          </div>
          <div class="setting-item__right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </li>
        <li class="setting-item">
          <div class="setting-item__content">
            <p>颜色主题</p>
          </div>
          <div class="setting-item__right">
            <el-switch
              v-model="dark"
              :active-color="switchBgColor"
              :inactive-color="switchBgColor"
              active-text="Dark"
              inactive-text="Light">
            </el-switch>
          </div>
        </li>
        <li class="setting-item">
          <div class="setting-item__content">
            <p>语言</p>
          </div>
          <div class="setting-item__right">
            <el-switch
              v-model="isZhCnLng"
              :active-color="switchBgColor"
              :inactive-color="switchBgColor"
              active-text="zh-CN"
              inactive-text="EN">
            </el-switch>
          </div>
        </li>
        <li class="setting-item">
          <div class="setting-item__content">
            <p>检测更新</p>
          </div>
          <div class="setting-item__right">
            v2.0.1 <i class="el-icon-refresh"></i>
          </div>
        </li>
        <li class="setting-item">
          <div class="setting-item__content">
            <p>关于</p>
          </div>
          <div class="setting-item__right">
            <i class="el-icon-warning-outline"></i>
          </div>
        </li>
        <li class="setting-item setting-item__document" @click="handleOpenDocumentWebsite">
          <div class="setting-item__content">
            <p>应用文档</p>
          </div>
          <div class="setting-item__right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';

export default {
  name: 'setting-list',
  data() {
    return {
      dark: true,
      isZhCnLng: true,
      theme: 'dark',
    };
  },
  computed: {
    isDarkMode() {
      return this.theme === 'dark';
    },
    switchBgColor() {
      return this.isDarkMode ? '#47B785' : '#279AFC';
    },
  },
  methods: {
    handleOpenDocumentWebsite() {
      alert('Open Document！')
    },
    handleGoParamsSettingPage() {
      this.$router.push({
        name: 'paramsSetting',
      });
    },
  },
  components: {
    TitleBar,
  },
}
</script>

<style lang="less">
.settings {
  margin: 0;
  padding: 40px 0 0;
  border-top: 1px solid var(--border-color);
  .setting-item {
    list-style: none;
    color: var(--text-color);
    font-size: 12px;
    padding-left: 15px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;
    display: flex;
    &:first-child {
      border-top: 1px solid var(--border-color);
    }
    &__content {
      flex: 1;
    }
    &__right {
      padding: 0 15px;
      font-size: 14px;
      color: var(--text-color);
      i {
        font-size: 16px;
      }
    }
    &:hover {
      background: var(--hover-bg-color);
    }

    &__document {
      margin-top: 40px;
      border-top: 1px solid var(--border-color);
    }
  }

  .el-switch__label {
    color: var(--text-color);
    font-weight: normal;
    font-size: 13px !important;
    &.is-active {
      color: var(--icon-color-actived);
    }
  }
}

.el-switch__label * {
  font-size: 13px !important;
}
</style>