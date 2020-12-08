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
      <i class="icon el-icon-delete" @click="handleDeleteApp"></i>
      <i class="icon el-icon-edit" @click="handleEditApp"></i>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
    ...mapActions(['delete']),
    handleDeleteApp() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    handleEditApp() {},
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
        font-size: var(--text-font-size);
        font-weight: normal;
      }
      i {
        padding-right: 5px;
        font-size: 13px;
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