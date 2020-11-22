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
      <p class="app-description">{{ app.description }}这是一段描述</p>
    </div>
    <div class="app-item__footer">
      <i class="icon el-icon-delete" @click="appDel"></i>
      <i class="icon el-icon-edit" @click="appEdit"></i>
    </div>
  </div>
</template>

<script>
import { LocalStore } from '@/application/LocalStore';
import _ from 'lodash';

export default {
  components: {},
  props: {
    app: {
      type: Object,
      required: true,
    },
  },
  methods: {
    appDel() {
      this.$emit('appDel', this.app.id);
    },
    appEdit() {
      this.$emit('appEdit', this.app.id);
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
      align-items: center;
      padding-bottom: 6px;
      h3 {
        font-size: 12px;
      }
      i {
        padding-right: 5px;
        font-size: 13px;
      }
    }
    .app-description {
      font-size: 10px;
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