<template>
  <div class="main_view">
    <TitleBar
      :titleText="$t('page.application.title')"
      :showBtn="true"
      @handleClick="handleCreateApp"
    />
    <div class="main_content">
      <div class="search">
        <el-input
          :placeholder="$t('page.application.searchPlaceholder')"
          v-model="searchValue"
          :debounce="1000"
          @input="handleSearchByName"
          clearable
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <div class="item_list_content" v-if="!isEmpty">
        <AppItem
          v-for="app of apps"
          :key="app.id"
          :app="app"
          @delete="handleDeleteApp"
          @edit="handleEditApp"
          @set-top="handleSetTop"
          @cancel-top="handleCancelTop"
        />
      </div>
      <div v-else class="empty">
        <div class="empty__svg"></div>
        <div class="empty__tips">
          <p>{{ $t('page.application.empty.message') }}</p>
          <p>{{ $t('page.application.empty.tips') }}</p>
        </div>
      </div>

      <div class="search-result-empty" v-if="showSearchResultIsEmpty">未搜索到任何内容！:)</div>
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
      apps: [],
      searchValue: '',
      searchResultIsEmpty: false,
    };
  },
  computed: {
    ...mapGetters('Application', ['searchByQuery', 'isEmpty']),
    showSearchResultIsEmpty() {
      return this.searchResultIsEmpty && this.searchValue.trim() !== '';
    },
  },
  methods: {
    ...mapActions('Application', ['create', 'delete', 'setTop', 'cancelTop']),
    handleCreateApp(app) {
      const h = this.$createElement;
      const _this = this;
      const title = app ? '编辑应用' : '创建应用';
      this.$msgbox({
        title,
        message: h(AddApp, {
          key: Date.now(),
          props: {
            app: app || null,
          },
        }),
        showCancelButton: false,
        showConfirmButton: false,
      })
        .then(() => {})
        .catch(() => {});
    },

    handleDeleteApp(app) {
      this.delete(app.id);
    },
    handleEditApp(app) {
      this.handleCreateApp(app);
    },

    handleSetTop(app) {
      this.setTop(app);
    },
    handleCancelTop(app) {
      this.cancelTop(app);
    }
  },

  created() {
    this.apps = this.searchByQuery('');

    const _this = this;
    this.handleSearchByName = _.debounce((val) => {
      _this.apps = _this.searchByQuery(val);
      _this.searchResultIsEmpty = _this.apps.length === 0;
    }, 500);
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
    overflow: hidden;
    position: relative;
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

.search-result-empty {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--text-placeholder-font-size);
  color: var(--text-color);
}
</style>