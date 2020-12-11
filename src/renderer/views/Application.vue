<template>
  <div class="main_view">
    <TitleBar
      :titleText="$t('page.application.title')"
      :showBtn="true"
      @handleClick="addApp"
    />
    <div class="main_content">
      <div class="search">
        <el-input
          :placeholder="$t('page.application.searchPlaceholder')"
          v-model="searchValue"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <div class="item_list_content" v-if="!isEmpty">
        <AppItem v-for="app of apps" :key="app.id" :app="app" />
      </div>
      <div v-else class="empty">
        <div class="empty__svg"></div>
        <div class="empty__tips">
          <p>{{ $t('page.application.empty.message') }}</p>
          <p>{{ $t('page.application.empty.tips') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TitleBar from '@/components/TitleBar.vue';
import AppItem from '@/components/app/AppItem.vue';
import AddApp from '@/components/app/AddApp.vue';
import { LocalStore } from '@/application/LocalStore';
import _ from 'lodash';

export default {
  components: { TitleBar, AppItem, AddApp },
  data() {
    return {
      searchValue: '',
    };
  },
  computed: {
    ...mapGetters('Application', [
      'apps',
      'searchByQuery',
      'isEmpty'
    ]),
  },
  methods: {
    ...mapActions('Application', ['create']),
    addApp() {
      const h = this.$createElement;
      const _this = this;
      this.$msgbox({
        title: '创建应用',
        message: h(AddApp, {
          props: {
            status: 'add',
          },
          on: { handleAddApp: _this.handleAddApp },
        }),
        showCancelButton: false,
        showConfirmButton: false,
      });
    },

    handleAddApp(app) {
      this.create(app);
    },
  },
  created() {},
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
    overflow: hidden;
    .search {
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      flex-shrink: 0;
      padding-bottom: 15px;
      background: var(--sidebar-bg-color);
    }
    .item_list_content {
      border-top: 1px solid var(--border-color);
      width: 100%;
      flex: 1;
      overflow: auto;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-content: flex-start;
    }
  }
}

.empty {
  flex: 1;
  display: flex;
  font-size: 28px;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  &__svg {
    width: 90px;
    height: 90px;
    background: url(~@/assets/svg/empty-a-1.svg) center center no-repeat;
    background-size: 100%;
    cursor: help;
    &:hover {
      background: url(~@/assets/svg/empty-a-2.svg) center center no-repeat;
      background-size: 100%;
      + .empty__tips {
        p {
          display: none;
          &:last-child {
            display: block;
          }
        }
      }
    }
  }
  &--role {
    .empty__svg {
      background: url(~@/assets/svg/empty-b-1.svg) center center no-repeat;
      background-size: 100%;
      &:hover {
        background: url(~@/assets/svg/empty-b-2.svg) center center no-repeat;
        background-size: 100%;
      }
    }
  }
  &__tips {
    padding-top: 15px;
  }

  img {
    width: 90px;
    opacity: 0.9;
  }
  p {
    color: var(--text-color);
    font-size: var(--text-tips-font-size);
    line-height: 24px;
    height: 24px;
    text-align: center;
    margin: 0 20px;
    &:last-child {
      display: none;
    }
  }
}

.el-input--prefix .el-input__inner {
  background-color: var(--search-bg-color);
  border: 0;
  font-size: var(--text-placeholder-font-size);
  height: 30px;
  color: var(--text-color);
}
.el-input__icon {
  line-height: 31px;
}
</style>