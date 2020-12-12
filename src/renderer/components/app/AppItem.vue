<template>
  <div class="app-item">
    <div class="app-item__container">
      <div class="app-name">
        <i
          v-if="app.startMode === 'H5DevTool'"
          class="icon el-icon-mobile-phone"
        ></i>
        <i v-else class="icon el-icon-monitor"></i>
        <h3>{{ app.name }}</h3>
      </div>
      <p class="app-description">{{ app.description }}</p>
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
      <el-tooltip content="编辑" placement="top" :open-delay="500" :enterable="false">
        <i class="icon el-icon-edit" @click="handleEditApp"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    app: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleDeleteApp() {
      this.$emit('delete', this.app);
    },
    handleEditApp() {
      this.$emit('edit', this.app);
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
  &:hover {
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
</style>