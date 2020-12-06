<template>
  <div class="main_view">
    <TitleBar
      :titleText="$t('page.role.title')"
      :showBtn="true"
      @handleClick="addRole"
      :tips="$t('page.role.tips')"
    />
    <div class="main_content">
      <div class="item_list_content" v-if="roleOptionsVisible">
        <RoleItem v-for="item of roleOptions" :key="item.id" :role="item" />
      </div>
      <div v-else class="empty empty--role">
        <div class="empty__svg"></div>
        <div class="empty__tips">
          <p>{{ $t('page.role.empty.message') }}</p>
          <p>{{ $t('page.role.empty.tips') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import RoleItem from '@/components/role/RoleItem.vue';
import AddRole from '@/components/role/AddRole.vue';
import _ from 'lodash';
import { v4 } from 'uuid';

export default {
  name: 'MainRole',
  components: { TitleBar, RoleItem, AddRole },
  data() {
    // 这里存放数据
    return {
      roleOptions: [],
    };
  },
  // 监听属性 类似于data概念
  computed: {
    roleOptionsVisible() {
      return this.roleOptions.length != 0;
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    addRole() {
      const h = this.$createElement;
      const _this = this;
      this.$msgbox({
        title: '添加角色',
        message: h(AddRole, {
          props: { status: 'add' },
          on: { addRoleHandle: _this.addRoleHandle },
        }), // (<AddRole status="add"></AddRole>)
        showCancelButton: false,
        showConfirmButton: false,
      })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    },

    roleEdit(roleItemId) {
      const h = this.$createElement;
      const _this = this;
      this.$msgbox({
        title: '修改角色 ',
        message: h(AddRole, {
          props: { status: 'edit', roleId: roleItemId },
          on: { handleEditRole: _this.editHandleRole },
        }), // (<AddRole status="edit" roleId={roleItemId} ></AddRole>),
        showCancelButton: false,
        showConfirmButton: false,
      })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    },
    roleDel(roleItemId) {
      const newRoleOptions = _.filter(
        this.roleOptions,
        (o) => o.id != roleItemId
      );
      this.roleOptions = newRoleOptions;
      const apiStr = JSON.stringify(this.roleOptions);
      console.log(apiStr);
      localStorage.setItem(`role_`, apiStr);
    },
    addRoleHandle(role) {
      this.roleOptions.push(role);
    },
    editHandleRole(options) {
      this.roleOptions = options;
    },
  },
  created() {
    const options = localStorage.getItem('role_');
    const parseOption = options ? JSON.parse(options) : [];
    this.roleOptions = parseOption;
  },
};
</script>

<style lang='less'>
</style>