<template>
  <div class="main_view">
    <TitleBar :titleText="$t('page.setting.title')" />
    <div class="main_content">
      <ul class="settings">
        <li
          class="setting-item"
          @click="handleGoParamsSettingPage"
        >
          <div class="setting-item__content">
            <p>{{ $t('page.setting.list.paramsSetting') }}</p>
          </div>
          <div class="setting-item__right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </li>
        <li class="setting-item" @click="handleOpenDocumentWebsite">
          <div class="setting-item__content">
            <p>{{ $t('page.setting.list.document') }}</p>
          </div>
          <div class="setting-item__right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </li>
        <!-- driver -->
        <li class="setting-item setting-item__driver">
          <div class="setting-item__content">
            <p>{{ $t('page.setting.list.theme.label') }}</p>
          </div>
          <div class="setting-item__right">
            <el-switch
              v-model="dark"
              :active-color="switchBgColor"
              :inactive-color="switchBgColor"
              :active-text="$t('page.setting.list.theme.dark')"
              :inactive-text="$t('page.setting.list.theme.light')"
              @change="bgColorSwitch"
            >
            </el-switch>
          </div>
        </li>
        <li class="setting-item">
          <div class="setting-item__content">
            <p>{{ $t('page.setting.list.language.label') }}</p>
          </div>
          <div class="setting-item__right" :key="renderKey">
            <el-switch
              v-model="isZhCnLng"
              :active-color="switchBgColor"
              :inactive-color="switchBgColor"
              :active-text="$t('page.setting.list.language.zhCN')"
              :inactive-text="$t('page.setting.list.language.en')"
              @change="languageSwitch"
            >
            </el-switch>
          </div>
        </li>
        <li class="setting-item">
          <div class="setting-item__content">
            <p>{{ $t('page.setting.list.version') }}</p>
          </div>
          <div class="setting-item__right">
            {{ version }}
          </div>
        </li>
        <li class="setting-item" @click="centerDialogVisible = true">
          <div class="setting-item__content">
            <p>{{ $t('page.setting.list.about') }}</p>
          </div>
          <div class="setting-item__right">
            <i class="el-icon-warning-outline"></i>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog
      :title="$t('page.setting.list.description.title')"
      :visible.sync="centerDialogVisible"
      class="about-dialog"
      width="380px"
      center
    >
      <span>{{ $t('page.setting.list.description.content') }}</span>
    </el-dialog>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import { shell, remote } from 'electron';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'setting-list',
  data() {
    return {
      dark: true,
      isZhCnLng: true,
      version: '',
      centerDialogVisible: false,
      renderKey: Date.now(),
    };
  },
  computed: {
    ...mapState('Setting', { vuex_dark: 'dark', vuex_isZhCnLng: 'isZhCnLng' }),
    switchBgColor() {
      return this.dark ? '#47B785' : '#279AFC';
    },
  },
  methods: {
    ...mapActions('Setting', ['changedark', 'changeLanguage']),
    handleOpenDocumentWebsite() {
      shell.openExternal('https://open.workplus.io/v4/dev-tools/');
    },
    handleGoParamsSettingPage() {
      this.$router.push({
        name: 'paramsSetting',
      });
    },
    languageSwitch(value) {
      this.$i18n.locale = value ? 'zh-CN' : 'en';
      this.changeLanguage(value);

      remote.app.changeLanguage(this.$i18n.locale);
    },
    bgColorSwitch(value) {
      if (value) {
        document
          .getElementsByTagName('body')[0]
          .setAttribute('data-theme', 'dark');
      } else {
        document
          .getElementsByTagName('body')[0]
          .setAttribute('data-theme', 'light');
      }
      this.changedark(value);
      this.renderKey = Date.now();
    },
    getVersion() {
      this.version = `v${process.env.MY_VERSION}`;
    },
  },
  components: {
    TitleBar,
  },
  created() {
    this.getVersion();
    this.dark = this.vuex_dark;
    this.isZhCnLng = this.vuex_isZhCnLng;
  },
};
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