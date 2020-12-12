<template>
  <div class="create-dialog create-role">
    <el-form
      label-position="top"
      label-width="80px"
      :model="formRole"
      style="width: 380px"
      :rules="rules"
      ref="roleForm"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="formRole.name"
          placeholder="请输入角色名称"
          maxlength="30"
          show-word-limit
          autofocus
        ></el-input>
      </el-form-item>
      <el-form-item label="域 ID" prop="domain">
        <el-input
          v-model="formRole.domain"
          placeholder="请输入域 ID，即 domain_id"
        ></el-input>
      </el-form-item>
      <el-form-item label="API 地址" prop="api">
        <el-input
          v-model="formRole.api"
          placeholder="请输入对应服务的 API 地址，需以 http(s):// 开头"
        ></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="user">
        <el-input
          v-model="formRole.user"
          placeholder="请输入你的账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input
          type="password"
          v-model="formRole.pwd"
          placeholder="请输入你的密码"
          show-password
        ></el-input>
      </el-form-item>
      <transition name="el-zoom-in-top">
        <el-form-item label="所在组织" required v-if="showOrgSelector">
          <el-select
            v-model="formRole.orgId"
            placeholder="请选择组织"
            :disabled="disableOrgSelector"
            @change="handleOrgSelectChanged"
          >
            <el-option
              v-for="org in orgs"
              :key="org.org_code"
              :label="org.name"
              :value="org.org_code"
            ></el-option>
          </el-select>
        </el-form-item>
      </transition>
      <div v-if="disableOrgSelector" class="form-tips">
        验证通过后，才可选择组织！
      </div>
      <el-form-item class="footer">
        <el-button
          v-if="!validation"
          type="primary"
          @click="handleValidation"
          :loading="loading"
          size="medium"
          >{{ validateBtnText }}</el-button
        >
        <el-button size="medium" v-else type="primary" @click="handleAddRole">
          {{ isCreate ? '添加角色' : '保存修改' }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseRequest from '@/server/BaseRequest.js';
import DetailRequest from '@/server/DetailRequest.js';
import _ from 'lodash';
import { Loading } from 'element-ui';
import { v4 as uuidv4 } from 'uuid';
import { defaultRoleInfo } from '@/constants/initialData';

export default {
  components: {},
  props: {
    role: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formRole: {
        ...defaultRoleInfo,
      },

      validation: false,
      loading: false,

      orgs: [],

      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
        ],
        domain: [
          { required: true, message: '域 ID 不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '已超出最大字符数 50', trigger: 'blur' },
        ],
        api: [
          { required: true, message: 'API 地址不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '已超出最大字符数 100',
            trigger: 'blur',
          },
        ],
        user: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 1, max: 30, message: '已超出最大字符数 30', trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 1, max: 30, message: '已超出最大字符数 30', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters('Role', ['getRoleByName']),
    isCreate() {
      return this.role === null;
    },
    validateBtnText() {
      return this.loading ? '验证中...' : '验证服务';
    },
    showOrgSelector() {
      return (this.orgs.length > 0 && this.validation) || !this.isCreate;
    },
    disableOrgSelector() {
      return !this.isCreate && this.orgs.length === 1 && !this.validation;
    },
  },
  methods: {
    ...mapActions('Role', ['create', 'update']),

    async handleValidation() {
      const valid = await this.$refs['roleForm'].validate();
      if (!valid) return;

      this.loading = true;
      const data = await DetailRequest.getToken(this.formRole);
      this.loading = false;

      const state = _.get(data, `data.status`, -1);
      if (state !== 0) {
        const message = _.get(data, `data.message`, '服务验证出错');
        return this.$message.error(message);
      }

      const accessToken = _.get(data, `data.result.access_token`, '');

      this.$message({
        message: '服务验证成功',
        type: 'success',
      });
      this.validation = true;

      this.initOrgSelector(accessToken, this.formRole.api);
    },

    async initOrgSelector(token, api) {
      const orgs = await DetailRequest.getOrganization(token, api);
      if (!orgs || orgs.length === 0) {
        return this.$message.error(`获取组织信息失败`);
      }

      if (!this.isCreate && this.formRole.orgId) {
        const selected = orgs.find((org) => org.org_code === this.formRole.orgId);
        this.formRole.orgId = selected.org_code;
        this.formRole.orgName = selected.name;
      } else {
        this.formRole.orgId = orgs[0].org_code;
        this.formRole.orgName = orgs[0].name;
      }
      
      this.orgs = orgs;
    },

    handleAddRole() {
      if (this.validation) {
        const role = {
          ...this.formRole,
          lastUpdateTime: Date.now(),
        };

        const storeRole = this.getRoleByName(this.formRole.name);
        if (storeRole) {
          if (this.isCreate || storeRole.id !== this.formRole.id) {
            return this.$message.error(`角色 [${this.formRole.name}] 已存在！`);
          }
        }

        this.$msgbox.close();
        if (this.isCreate) {
          role.id = uuidv4();
          this.create(role);
        } else {
          role.id = this.role.id;
          console.log(role);
          this.update(role);
        }

        const message = this.isCreate ? '角色创建成功！' : '角色资料已更新！';
        this.$message.success(message);
      }
    },

    handleOrgSelectChanged(val) {
      const selected = this.orgs.find((org) => org.org_code === val);
      if (selected) {
        this.formRole.orgName = selected.name;
      }
    },
  },
  created() {
    if (!this.isCreate) {
      this.formRole = { ...this.role };
      this.orgs = [{ org_code: this.role.orgId, name: this.role.orgName }];
    }
  },
};
</script>

<style lang='less'>
.form-tips {
  color: var(--text-desc-color);
  font-size: var(--text-desc-font-size);
  margin-top: -8px;
}
</style>