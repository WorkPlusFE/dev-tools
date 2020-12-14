<template>
  <div class="main_view">
    <TitleBar
      :titleText="$t('page.role.title')"
      :showBtn="true"
      @handleClick="handleCreateRole"
      :tips="$t('page.role.tips')"
    />
    <div class="main_content">
      <div class="item_list_content" v-if="!isEmpty">
        <RoleItem
          v-for="role of roles"
          :key="role.id"
          :role="role"
          @edit="handleCreateRole"
          @delete="handleDeleteRole"
          @copy="handleCopyRole"
        />
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
import { mapGetters, mapActions } from 'vuex';
import TitleBar from '@/components/TitleBar.vue';
import RoleItem from '@/components/role/RoleItem.vue';
import AddRole from '@/components/role/AddRole.vue';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'MainRole',
  components: { TitleBar, RoleItem, AddRole },
  data() {
    return {
      roleOptions: [],
    };
  },
  computed: {
    ...mapGetters('Application', ['apps']),
    ...mapGetters('Setting', ['createRoleFirst']),
    ...mapGetters('Role', ['roles', 'isEmpty', 'role']),
  },
  methods: {
    ...mapActions('Role', ['delete', 'create']),
    ...mapActions('Setting', ['changeCreateRoleFirst']),
    handleCreateRole(role) {
      const h = this.$createElement;
      const _this = this;
      const title = role ? '编辑角色' : '添加角色';
      const roleProps = role || null;
      this.$msgbox({
        title,
        message: h(AddRole, {
          key: Date.now(),
          props: { role: roleProps },
        }),
        showCancelButton: false,
        showConfirmButton: false,
      })
        .then((action) => {})
        .catch((err) => {});
    },

    handleDeleteRole(role) {
      const binds = this.apps.filter((app) => app.role === role.id);
      const count = binds.length;
      if (count > 0) {
        const message =
          count > 1
            ? '当前角色已被多个应用使用，不可删除！'
            : `当前角色已被应用[${binds[0].name}]使用，不可删除！`;
        return this.$message.error(message);
      }
      this.delete(role.id);
    },

    handleCopyRole(role) {
      const namePrev = '(新)';
      const newRole = {
        ...role,
        name: `${namePrev}${role.name}`,
        id: uuidv4(),
      };
      this.create(newRole);
    },
  },

  created() {
    if (this.createRoleFirst) {
      this.handleCreateRole();
      this.changeCreateRoleFirst(false);
    }
  },
};
</script>

<style lang='less'>
</style>