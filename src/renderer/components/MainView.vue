<template>
  <div class="main_view">
    <TitleBar titleText="应用列表" btnText="添加应用" @handleClick="addApp" />
    <div class="main_content">
      <div class="search">
        <el-input placeholder="请输入关键字" v-model="searchValue">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <div class="item_list_content" v-if="appOptionsVisible">
        <AppItem v-for="item of appOptions" :key="item.id" :app="item" />
      </div>
      <div v-else class="item_list_empty">请添加应用</div>
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import AppItem from '@/components/app/AppItem.vue';
import AddApp from '@/components/app/AddApp.vue';
import { LocalStore } from '@/application/LocalStore';
import _ from 'lodash';

export default {
  components: { TitleBar, AppItem, AddApp },
  data() {
    // 这里存放数据
    return {
      searchValue: '',
      appOptions: [],
    };
  },
  // 监听属性 类似于data概念
  computed: {
    appOptionsVisible() {
      return this.appOptions.length != 0;
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    /** 打开添加浮层 */
    addApp() {
      console.log(22);
      const h = this.$createElement;
      const _this = this;
      this.$msgbox({
        title: '创建应用',
        message: h(AddApp, {
          props: {},
          on: { handleAddApp: _this.handleAddApp },
        }),
        showCancelButton: false,
        showConfirmButton: false,
      })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    },
    /** 添加应用 */
    handleAddApp(options) {
      this.appOptions = options;
    },
    /** 删除应用 */
    handleAppDel(appId) {
      const newAppOptions = _.filter(this.appOptions, (o) => o.id != appId);
      this.appOptions = newAppOptions;
      LocalStore.setLocalStoreArr('app_', newAppOptions);
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    const parseOption = LocalStore.getLocalStoreArr('app_');
    this.appOptions = parseOption;
  },
};
</script>

<style lang='less'>
.main_view {
  flex: 1;
  height: 100vh;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  .main_content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .search {
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      flex-shrink: 0;
      padding-bottom: 15px;
      background: var(--sidebar-bg-color);
      border-bottom: 1px solid var(--border-color);
    }
    .item_list_content {
      width: 100%;
      flex: 1;
      overflow: auto;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-content: flex-start;
    }
    .item_list_empty {
      color: var(--text-color);
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 28px;
      padding: 20px 0;
    }
  }
}

.el-input--prefix .el-input__inner {
  background-color: var(--search-bg-color);
  border: 0;
  font-size: 12px;
  height: 30px;
  color: var(--text-color);
}
.el-input__icon {
  line-height: 31px;
}
</style>