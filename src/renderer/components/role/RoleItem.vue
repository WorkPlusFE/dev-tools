<template>
  <div class="role-item">
    <div class="role-item__container">
      <div class="role-name">
        <h3>{{ role.roleName }}</h3>
      </div>
      <p class="role-description"><strong>{{$t('page.role.domainLabel')}}</strong><i>{{ role.domain }}</i></p>
      <p class="role-description"><strong>{{$t('page.role.orgLabel')}}</strong><i>测试-恒拓高科技术</i></p>
      <p class="role-description"><strong>{{$t('page.role.accountLabel')}}</strong><i>{{ role.user }}</i></p>
      <p class="role-description"><strong>{{$t('page.role.apiLabel')}}</strong><i>{{ role.api }}</i></p>
    </div>
    <div class="role-item__footer">
      <i class="icon el-icon-delete" @click="roleDel"></i>
      <i class="icon el-icon-edit" @click="roleEdit"></i>
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
    roleEdit() {
      this.$emit('roleEdit', this.roleItemId);
    },
    roleDel() {
      this.$emit('roleDel', this.roleItemId);
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
        font-size: 12px;
      }
    }
    .role-description {
      font-size: 10px;
      line-height: 16px;
      strong {
        font-weight: normal;
        width: 7em;
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