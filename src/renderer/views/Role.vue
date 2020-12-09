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
        <RoleItem v-for="role of roles" :key="role.id" :role="role" @edit="handleCreateRole" @delete="handleDeleteRole"/>
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
    ...mapActions('Role' ,[
      'delete',
    ]),
    handleCreateRole(role) {
      const h = this.$createElement;
      const _this = this;
      const title = role ? '编辑角色' : '添加角色';
      this.$msgbox({
        title,
        message: h(AddRole, {
          props: { role: role || null },
        }),
        showCancelButton: false,
        showConfirmButton: false,
      })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    },

    handleDeleteRole(role) {
      this.delete(role.id);
    },
  },
};
</script>

<style lang='less'>
</style>