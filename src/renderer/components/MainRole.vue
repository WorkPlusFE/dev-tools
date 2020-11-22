<template>
  <div class="main_view">
    <TitleBar titleText="角色管理" btnText="添加角色" @handleClick="addRole" />
    <div class="main_content">
      <div class="item_list_content" v-if="roleOptionsVisible">
        <RoleItem
          v-for="item of roleOptions"
          :key="item.id"
          :role="item"
        />
      </div>
      <div v-else class="item_list_empty">请添加角色</div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
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
        customClass: 'no_dray',
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
        customClass: 'no_dray',
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
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    const options = localStorage.getItem('role_');
    const parseOption = options ? JSON.parse(options) : [];
    this.roleOptions = parseOption;
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'>

</style>