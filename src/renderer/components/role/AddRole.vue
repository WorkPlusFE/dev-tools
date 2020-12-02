<template>
  <div class="add_app">
    <el-form
      label-position="right"
      label-width="80px"
      :model="formRole"
      style="width: 380px"
    >
      <el-form-item label="角色名称">
        <el-input v-model="formRole.roleName"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="formRole.user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formRole.pwd"></el-input>
      </el-form-item>
      <el-form-item label="API地址">
        <el-input v-model="formRole.api"></el-input>
      </el-form-item>
      <el-form-item label="域名">
        <el-input v-model="formRole.domain"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleValidation">服务验证</el-button>
        <el-button v-if="isAdd" type="primary" @click="handleAddRole"
          >添加</el-button
        >
        <el-button v-else type="primary" @click="handleEditRole"
          >修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BaseRequest from '@/server/BaseRequest.js';
import DetailRequest from '@/server/DetailRequest.js';
import _ from 'lodash';
import { Loading } from 'element-ui';
import { v4 as uuidv4 } from 'uuid';
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    status: {
      type: String,
      required: true,
    },
    roleId: {
      type: String,
    },
  },
  data() {
    // 这里存放数据
    return {
      formRole: {
        roleName: '',
        user: '',
        pwd: '',
        api: '',
        domain: '',
      },
      validation: false, // 添加的服务是否验证成功
    };
  },
  // 监听属性 类似于data概念
  computed: {
    isAdd() {
      return this.status == 'add';
    },
  },
  // 监控data中的数据变化
  watch: {
    roleId() {
      if (this.status == 'edit') {
        const options = localStorage.getItem('role_');
        const parseOption = options ? JSON.parse(options) : [];
        const roleItem = _.find(parseOption, (o) => o.id == this.roleId);
        this.formRole = { ...roleItem };
      }
    },
    status() {
      if (this.status == 'add') {
        this.formRole = {
          roleName: '',
          user: '',
          pwd: '',
          api: '',
          domain: '',
        };
      }
    },
  },
  // 方法集合
  methods: {
    handleValidation() {
      const loadingInstance = Loading.service({ text: '正在验证服务是否正确' });
      DetailRequest.getToken(this.formRole)
        .then((data) => {
          const token = _.get(data, `data.result.access_token`, '');
          const state = _.get(data, `data.status`, -1);
          const message = _.get(data, `data.message`, '');
          if (state == 0) {
            this.$message({
              message: '服务验证成功',
              type: 'success',
            });
            this.validation = true;
            loadingInstance.close();
          } else {
            this.$message.error(message);
            loadingInstance.close();
          }
        })
        .catch((err) => {
          loadingInstance.close();
          this.$message.error('服务验证出错');
        });
    },
    handleAddRole() {
      if (this.validation) {
        const options = localStorage.getItem('role_');
        const parseOption = options ? JSON.parse(options) : [];
        const obj = {
          roleName: this.formRole.roleName,
          user: this.formRole.user,
          pwd: this.formRole.pwd,
          api: this.formRole.api,
          domain: this.formRole.domain,
          id: uuidv4(),
        };
        parseOption.push(obj);
        this.$emit('addRoleHandle', obj);
        this.resetOption(parseOption);
      } else {
        this.$message.error('请先验证服务是否正确');
      }
    },
    handleEditRole() {
      if (this.validation) {
        const options = localStorage.getItem('role_');
        const parseOption = options ? JSON.parse(options) : [];
        const index = _.findIndex(parseOption, (o) => o.id == this.roleId);
        if (index != -1) {
          _.set(parseOption, `${index}`, this.formRole);
          this.$emit('handleEditRole', parseOption);
          this.resetOption(parseOption);
        }
      } else {
        this.$message.error('请先验证服务是否正确');
      }
    },
    resetOption(parseOption) {
      const apiStr = JSON.stringify(parseOption);
      localStorage.setItem(`role_`, apiStr);
      this.$emit('handleEditRole', parseOption);
      this.validation = false;
      this.formRole = {
        roleName: '',
        user: '',
        pwd: '',
        api: '',
        domain: '',
      };
      this.$msgbox.close();
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeUpdate() {}, // 生命周期 - 更新之前
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (this.status == 'edit') {
      const options = localStorage.getItem('role_');
      const parseOption = options ? JSON.parse(options) : [];
      const roleItem = _.find(parseOption, (o) => o.id == this.roleId);
      this.formRole = { ...roleItem };
    }
  },
  beforeCreate() {}, // 生命周期 - 创建之前
};
</script>
<style lang='less' scoped>
.add_app {
  width: 200px;
}
</style>