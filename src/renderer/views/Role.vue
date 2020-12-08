<template>
  <div class="main_view">
    <TitleBar
      :titleText="$t('page.role.title')"
      :showBtn="true"
      @handleClick="addRole"
      :tips="$t('page.role.tips')"
    />
    <div class="main_content">
      <div class="item_list_content" v-if="!isEmpty">
        <RoleItem v-for="role of roles" :key="role.id" :role="role" />
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
import { mapGetters, mapActions } from "vuex";
import TitleBar from '@/components/TitleBar.vue';
import RoleItem from '@/components/role/RoleItem.vue';
import AddRole from '@/components/role/AddRole.vue';
import _ from 'lodash';
import { v4 } from 'uuid';

export default {
  name: 'MainRole',
  components: { TitleBar, RoleItem, AddRole },
  data() {
    return {
      roleOptions: [],
    };
  },
  computed: {
    ...mapGetters('Role', [
      'roles',
      'isEmpty',
    ]),
  },
  methods: {
    addRole() {
      const h = this.$createElement;
      const _this = this;
      this.$msgbox({
        title: '添加角色',
        message: h(AddRole, {
          props: { status: 'add' },
          on: { addRoleHandle: _this.addRoleHandle },
        }),
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
        }),
        showCancelButton: false,
        showConfirmButton: false,
      })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    },
    roleDel(roleItemId) {

    },
    addRoleHandle(role) {
    },
    editHandleRole(options) {
    },
  },
  created() {

  },
};
</script>

<style lang='less'>
</style>