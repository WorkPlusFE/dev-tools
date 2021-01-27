<template>
  <div class="role-item" @dblclick="handleEditRole">
    <div class="role-item__container">
      <div class="role-name">
        <i class="icon el-icon-s-custom"></i> <h3>{{ role.name }}</h3>
      </div>
      <p class="role-description">
        <strong>{{ $t('page.role.domainLabel') }}</strong
        ><i>{{ role.domain }}</i>
      </p>
      <p class="role-description">
        <strong>{{ $t('page.role.orgLabel') }}</strong
        ><i>{{ role.orgName }}</i>
      </p>
      <p class="role-description">
        <strong>{{ $t('page.role.accountLabel') }}</strong
        ><i>{{ role.user }}</i>
      </p>
      <p class="role-description">
        <strong>{{ $t('page.role.apiLabel') }}</strong
        ><i>{{ role.api }}</i>
      </p>
    </div>
    <div class="role-item__footer">
      <el-popconfirm
        :confirm-button-text="$t('component.role.popconfirm.del')"
        :cancel-button-text="$t('component.role.popconfirm.cancel')"
        :title="$t('component.role.popconfirm.title')"
        @confirm="handleDeleteRole"
      >
      <i class="icon el-icon-delete"  slot="reference" :title="$t('tooltips.del')"></i>
      </el-popconfirm>
      <i class="icon el-icon-copy-document" @click="handleCopyRole" :title="$t('tooltips.copy')"></i>
      <i class="icon el-icon-edit" :title="$t('tooltips.edit')" @click="handleEditRole"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    role: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleEditRole() {
      this.$emit('edit', this.role);
    },
    handleDeleteRole() {
      this.$emit('delete', this.role);
    },
    handleCopyRole() {
      this.$emit('copy', this.role);
    },
  },
};
</script>

<style lang='less' scoped>
.role-item {
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
    .role-name {
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
    .role-description {
      font-size: var(--text-desc-font-size);
      line-height: 16px;
      strong {
        font-weight: normal;
        width: 6em;
        display: inline-block;
      }
      i {
        padding-left: 5px;
        color: var(--text-primary-color);
        font-style: normal;
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
</style>