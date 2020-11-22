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
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      appDel() {
        this.$emit('appDel', this.appId);
      },
      appEdit() {
        this.$emit('appEdit', this.appId);
      },
      roleName(role) {
        const appOptions = LocalStore.getLocalStoreArr('app_');
        const appItem = _.find(appOptions, (o) => o.id == role);
        return appItem.name + '_' + appItem.user;
      },
    },
  },
};
</script>

<style lang='less' scoped>
@font-color: #d7dae0;
@icon-color: #6e7179;
@icon-color-actived: #d7dae0;

h3,
p {
  margin: 0;
}

.app-item {
  width: 100%;
  cursor: pointer;
  padding: 10px 15px;
  color: @font-color;
  border-bottom: 1px solid #1d1f23;
  &:hover {
    background: #2c313a;
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