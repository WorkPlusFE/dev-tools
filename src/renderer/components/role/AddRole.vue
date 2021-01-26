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
      <el-form-item :label="$t('component.addRole.name.label')" prop="name">
        <el-input
          v-model="formRole.name"
          :placeholder="$t('component.addRole.name.placeholder')"
          maxlength="20"
          show-word-limit
          class="role-name-input"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('component.addRole.domain.label')" prop="domain">
        <el-input
          v-model="formRole.domain"
          :placeholder="$t('component.addRole.domain.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('component.addRole.api.label')" prop="api">
        <el-input
          v-model="formRole.api"
          :placeholder="$t('component.addRole.api.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('component.addRole.user.label')" prop="user">
        <el-input
          v-model="formRole.user"
          :placeholder="$t('component.addRole.user.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('component.addRole.pwd.label')" prop="pwd">
        <el-input
          type="password"
          v-model="formRole.pwd"
          :placeholder="$t('component.addRole.pwd.placeholder')"
          show-password
        ></el-input>
      </el-form-item>
      <transition name="el-zoom-in-top">
        <el-form-item
          :label="$t('component.addRole.orgId.label')"
          required
          v-if="showOrgSelector"
        >
          <el-select
            v-model="formRole.orgId"
            :placeholder="$t('component.addRole.orgId.placeholder')"
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
        {{ $t('component.addRole.orgId.disableOrgSelector') }}
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
          {{ isCreate ? buttonLabel.create : buttonLabel.save }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DetailRequest from '@/server/DetailRequest.js';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { defaultRoleInfo } from '@/constants/initialData';
import { nameValidater, urlValidater } from '@/utils/validate';

export default {
  components: {},
  props: {
    role: {
      type: Object,
      default: null,
    },
    $t: {
      type: Function,
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

      buttonLabel: {
        create: this.$t('component.addRole.button.create'),
        save: this.$t('component.addRole.button.save'),
      },

      rules: {
        name: [
          {
            required: true,
            message: this.$t('component.addRole.rules.name.require'),
            trigger: 'blur',
          },
          {
            validator: nameValidater(this.$t('component.addRole.rules.name.validate')),
            trigger: 'blur',
          },
        ],
        domain: [
          {
            required: true,
            message: this.$t('component.addRole.rules.domain.require'),
            trigger: 'blur',
          },
          {
            min: 1,
            max: 50,
            message: this.$t('component.addRole.rules.domain.validate', {
              max: 50,
            }),
            trigger: 'blur',
          },
        ],
        api: [
          {
            required: true,
            message: this.$t('component.addRole.rules.api.require'),
            trigger: 'blur',
          },
          {
            validator: urlValidater(this.$t('component.addRole.rules.api.validate')),
            trigger: 'blur',
          },
          {
            min: 1,
            max: 100,
            message: this.$t('component.addRole.rules.api.max', { max: 100 }),
            trigger: 'blur',
          },
        ],
        user: [
          {
            required: true,
            message: this.$t('component.addRole.rules.user.require'),
            trigger: 'blur',
          },
          {
            min: 1,
            max: 30,
            message: this.$t('component.addRole.rules.user.validate', {
              max: 30,
            }),
            trigger: 'blur',
          },
        ],
        pwd: [
          {
            required: true,
            message: this.$t('component.addRole.rules.pwd.require'),
            trigger: 'blur',
          },
          {
            min: 1,
            max: 30,
            message: this.$t('component.addRole.rules.pwd.validate', {
              max: 30,
            }),
            trigger: 'blur',
          },
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
      return this.loading
        ? this.$t('component.addRole.button.validating')
        : this.$t('component.addRole.button.validate');
    },
    showOrgSelector() {
      return (this.orgs.length > 0 && this.validation) || !this.isCreate;
    },
    disableOrgSelector() {
      return !this.isCreate && this.orgs.length === 1 && !this.validation;
    },
  },
  watch: {
    formRole(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (newVal.domain !== oldVal.domain
        || newVal.api !== oldVal.api
        || newVal.user !== oldVal.user
        || newVal.pwd !== oldVal.pwd) {
          this.validation = false;
        }
    },
  },
  methods: {
    ...mapActions('Role', ['create', 'update']),

    async handleValidation() {
      try {
        const valid = await this.$refs.roleForm.validate();
        if (!valid) return;

        this.loading = true;
        const data = await DetailRequest.getToken(this.formRole);
        this.loading = false;

        const state = _.get(data, `data.status`, -1);
        if (state !== 0) {
          const message = _.get(
            data,
            `data.message`,
            this.$t('component.addRole.response.validateError')
          );
          return this.$message.error(message);
        }

        const accessToken = _.get(data, `data.result.access_token`, '');

        this.$message({
          message: this.$t('component.addRole.response.validateSuccess'),
          type: 'success',
        });
        this.validation = true;

        this.initOrgSelector(accessToken, this.formRole.api);
      } catch (error) {
        console.log(error);
      }
    },

    async initOrgSelector(token, api) {
      const orgs = await DetailRequest.getOrganization(token, api);
      if (!orgs || orgs.length === 0) {
        return this.$message.error(this.$t('component.addRole.response.getOrgError'));
      }

      const selected = orgs.find((org) => org.org_code === this.formRole.orgId);    
      if (!this.isCreate && this.formRole.orgId && selected) {
        this.formRole.orgId = selected.org_code;
        this.formRole.orgName = selected.name;
      } else {
        this.formRole.orgId = orgs[0].org_code;
        this.formRole.orgName = orgs[0].name;
      }

      this.orgs = orgs;
    },

    async handleAddRole() {
      const valid = await this.$refs.roleForm.validate();
      if (!valid) return;

      if (this.validation) {
        const role = {
          ...this.formRole,
          lastUpdateTime: Date.now(),
        };

        const storeRole = this.getRoleByName(this.formRole.name);
        if (storeRole) {
          if (this.isCreate || storeRole.id !== this.formRole.id) {
            const msg = this.$t('component.addRole.response.existed', {
              name: this.formRole.name,
            });
            return this.$message.error(msg);
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

        const message = this.isCreate
          ? this.$t('component.addRole.response.create')
          : this.$t('component.addRole.response.save');
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
  mounted() {
    setTimeout(() => {
      document
        .querySelector('.role-name-input')
        .querySelector('.el-input__inner')
        .focus();
    }, 300);
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