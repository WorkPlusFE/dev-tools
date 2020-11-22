<template>
  <div class="app-item">
    <div class="app-item__container">
      <div class="app-name">
        <i v-if="app.startMode === 'H5DevTool'" class="icon el-icon-mobile-phone"></i>
        <i v-else class="icon el-icon-monitor"></i>
        <h3>{{ app.name }}</h3>
      </div>
      <p class="app-description">{{ app.description }}这是一段描述</p>
    </div>
    <div class="app-item__footer">
      <i class="icon el-icon-delete"></i>
      <i class="icon el-icon-edit"></i>
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
  data() {
    return {};
  },
  methods: {
    appDel() {
      this.$emit('appDel', this.appId);
    },
  },
};
</script>

<style lang='less' scoped>
@font-color: #D7DAE0;
@icon-color: #6E7179;
@icon-color-actived: #D7DAE0;

h3, p {
  margin: 0;
}

.app-item {
  width: 100%;
  cursor: pointer;
  padding: 10px 15px;
  color: @font-color;
  border-bottom: 1px solid #1d1f23;
  &:hover {
    background: #2C313A;
  }
  &__container {
    padding-bottom: 10px;
    .app-name {
      display: flex;
      align-items: center;
      padding-bottom: 6px;
      h3 {
        font-size: 12px;
      }
      i {
        padding-right: 5px;
        font-size: 14px;
      }
    }
    .app-description {
      font-size: 10px;
    }
  }
  &__footer {
    display: flex;
    .icon {
      margin-right: 20px;
      color: @icon-color;
      &:hover {
        color: @icon-color-actived;
      }
    }
  }
}
</style>