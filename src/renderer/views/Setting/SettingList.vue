<template>
  <div class="main_view">
    <TitleBar :titleText="$t('page.setting.title')" />
    <div class="main_content">
      <ul class="settings">
        <li class="setting-item">
          <div class="setting-item__content">
            <p>{{$t('page.setting.list.theme.label')}}</p>
          </div>
          <div class="setting-item__right">
            <el-switch
              v-model="dark"
              :active-color="switchBgColor"
              :inactive-color="switchBgColor"
              :active-text="$t('page.setting.list.theme.dark')"
              :inactive-text="$t('page.setting.list.theme.light')">
            </el-switch>
          </div>
        </li>
        <li class="setting-item">
          <div class="setting-item__content">
            <p>{{$t('page.setting.list.language.label')}}</p>
          </div>
          <div class="setting-item__right">
            <el-switch
              v-model="isZhCnLng"
              :active-color="switchBgColor"
              :inactive-color="switchBgColor"
              :active-text="$t('page.setting.list.language.zhCN')"
              :inactive-text="$t('page.setting.list.language.en')">
            </el-switch>
          </div>
        </li>
        <li class="setting-item">
          <div class="setting-item__content">
            <p>{{$t('page.setting.list.testUpgrade')}}</p>
          </div>
          <div class="setting-item__right">
            v2.0.1 <i class="el-icon-refresh"></i>
          </div>
        </li>
        <li class="setting-item">
          <div class="setting-item__content">
            <p>{{$t('page.setting.list.about')}}</p>
          </div>
          <div class="setting-item__right">
            <i class="el-icon-warning-outline"></i>
          </div>
        </li>
        
        <li class="setting-item setting-item__driver" @click="handleGoParamsSettingPage">
          <div class="setting-item__content">
            <p>{{$t('page.setting.list.paramsSetting')}}</p>
          </div>
          <div class="setting-item__right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </li>
        <li class="setting-item" @click="handleOpenDocumentWebsite">
          <div class="setting-item__content">
            <p>{{$t('page.setting.list.document')}}</p>
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
      color: var(--text-color);
      i {
        font-size: 16px;
      }
    }
    &:hover {
      background: var(--hover-bg-color);
    }

    &__driver {
      margin-top: 40px;
      border-top: 1px solid var(--border-color);
    }
  }

  .el-switch__label {
    color: var(--text-color);
    font-weight: normal;
    &.is-active {
      color: var(--icon-color-actived);
    }
  }
}

.el-switch__label * {
  font-size: var(--text-font-size) !important;
}
</style>