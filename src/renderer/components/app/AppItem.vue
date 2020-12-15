<template>
  <div class="app-item" :class="{ 'is-top': isTop }" @click='handleOpen'>
    <div class="app-item__container">
      <div class="app-name">
        <i
          v-if="isH5Mode"
          class="icon el-icon-mobile-phone"
        ></i>
        <i v-else class="icon el-icon-monitor"></i>
        <h3>{{ app.name }}</h3>
      </div>
      <p class="app-description" v-if="app.description">
        <strong>应用描述：</strong
        ><i>{{ app.description }}</i>
      </p>
      <p class="app-description">
        <strong>访问地址：</strong
        ><i>{{ app.link }}</i>
      </p>
      <p class="app-description">
        <strong>角色：</strong
        ><i>{{ app.roleName }}</i>
      </p>
    </div>
    <div class="app-item__footer">
      <el-popconfirm
        confirm-button-text='删除'
        cancel-button-text='取消'
        title="确定删除该应用？"
        @confirm="handleDeleteApp"
      >
        <el-tooltip content="删除" placement="top" :open-delay="500" :enterable="false" slot="reference">
        <i class="icon el-icon-delete"></i>
        </el-tooltip>
      </el-popconfirm>
      
      <el-tooltip content="置顶" v-if="!isTop" placement="top" :open-delay="500" :enterable="false">
        <i class="icon el-icon-upload2" @click="handleSetTop"></i>
      </el-tooltip>
      <el-tooltip content="取消置顶" v-else placement="top" :open-delay="500" :enterable="false">
        <i class="icon el-icon-download" @click="handleCancelTop"></i>
      </el-tooltip>

      <el-popover
        v-if="isH5Mode"
        placement="top"
        trigger="click">
        <qrcode-vue :value="app.link" class="h5-link-qrcode" :size="200" :background="qrcodeBgColor"></qrcode-vue>
        <el-tooltip content="显示二维码"  placement="top" slot="reference" :open-delay="500" :enterable="false">
          <i class="iconfont iconqrcode"></i>
        </el-tooltip>
      </el-popover>

      <el-tooltip content="编辑" placement="top" :open-delay="500" :enterable="false">
        <i class="icon el-icon-edit" @click="handleEditApp"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { mapState } from "vuex";

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
      this.$emit('open-app', this.app);
    }
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
    }
  }
}

[data-theme="dark"] {
  .h5-link-qrcode {
    padding: 5px;
    border: 1px solid var(--text-primary-color);
  }
}

</style>