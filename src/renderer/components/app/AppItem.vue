<template>
  <div class="app-item" :class="{ 'is-top': isTop }" @click="handleOpen">
    <div class="app-item__container">
      <div class="app-name">
        <i v-if="isH5Mode" class="icon el-icon-mobile-phone"></i>
        <i v-else class="icon el-icon-monitor"></i>
        <h3>{{ app.name }}</h3>
      </div>
      <p class="app-description" v-if="app.description">
        <strong>{{$t('component.app.description')}}</strong><i>{{ app.description }}</i>
      </p>
      <p class="app-description">
        <strong>{{$t('component.app.link')}}</strong><i>{{ app.link }}</i>
      </p>
      <p class="app-description">
        <strong>{{$t('component.app.roleName')}}</strong><i>{{ app.roleName }}</i>
      </p>
    </div>
    <div class="app-item__footer">
      <el-popconfirm
        :confirm-button-text="$t('component.app.popconfirm.del')"
        :cancel-button-text="$t('component.app.popconfirm.cancel')"
        :title="$t('component.app.popconfirm.title')"
        @confirm="handleDeleteApp"
      >
        <i class="icon el-icon-delete" slot="reference" :title="$t('tooltips.del')" @click.stop></i>
      </el-popconfirm>
      <i class="icon el-icon-upload2" v-if="!isTop" :title="$t('tooltips.setTop')" @click.stop="handleSetTop"></i>
      <i class="icon el-icon-download" v-else :title="$t('tooltips.cancelTop')" @click.stop="handleCancelTop"></i>
      <el-popover v-if="isH5Mode" placement="top" trigger="click">
        <qrcode-vue
          :value="app.link"
          class="h5-link-qrcode"
          :size="200"
          :background="qrcodeBgColor"
        ></qrcode-vue>
        <i class="iconfont iconqrcode" slot="reference" :title="$t('tooltips.qrcode')" @click.stop></i>
      </el-popover>
      <i class="icon el-icon-edit" :title="$t('tooltips.edit')" @click.stop="handleEditApp"></i>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    QrcodeVue,
  },
  props: {
    app: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('Setting', { vuex_dark: 'dark' }),
    ...mapGetters('Role', ['getRoleById']),
    isH5Mode() {
      return this.app.startMode === 'H5DevTool';
    },
    isTop() {
      return this.app.top === 1;
    },
    qrcodeBgColor() {
      return this.vuex_dark ? '#47B785' : '#FFFFFF';
    },
  },
  methods: {
    handleDeleteApp() {
      this.$emit('delete', this.app);
    },
    handleEditApp() {
      this.$emit('edit', this.app);
    },
    handleSetTop() {
      this.$emit('set-top', this.app);
    },
    handleCancelTop() {
      this.$emit('cancel-top', this.app);
    },
    handleOpen() {
      const role = this.getRoleById(this.app.role);
      this.$emit('open-app', { ...this.app }, { ...role });
    },
  },
};
</script>

<style lang='less' scoped>
.app-item {
  width: 100%;
  cursor: pointer;
  padding: 10px 15px;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  &:hover,
  &.is-top {
    background: var(--hover-bg-color);
  }
  &__container {
    padding-bottom: 10px;
    .app-name {
      display: flex;
      align-items: flex-start;
      padding-bottom: 6px;
      h3 {
        font-size: var(--text-font-size);
        font-weight: normal;
      }
      i {
        padding-right: 5px;
        font-size: 13px;
        padding-top: 3px;
      }
    }
    .app-description {
      font-size: var(--text-desc-font-size);
      line-height: 16px;
      display: flex;
      strong {
        font-weight: normal;
        width: 6em;
        display: inline-block;
      }
      i {
        padding-left: 5px;
        color: var(--text-primary-color);
        font-style: normal;
        flex: 1;
        word-break: break-all;
      }
    }
  }
  &__footer {
    display: flex;
    .icon {
      font-size: 16px;
      margin-right: 20px;
      color: var(--icon-color);
      &:hover {
        color: var(--icon-color-actived);
      }
      &:focus {
        outline: none;
      }
    }
  }
}

[data-theme='dark'] {
  .h5-link-qrcode {
    padding: 5px;
    border: 1px solid var(--text-primary-color);
  }
}
</style>