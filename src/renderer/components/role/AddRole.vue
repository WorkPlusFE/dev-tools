<template>
  <div class="create-dialog create-role">
    <el-form
      label-position="top"
      label-width="80px"
      :model="formRole"
      style="width: 380px"
    >
      <el-form-item label="角色名称">
        <el-input
          v-model="formRole.roleName"
          placeholder="请输入角色名称，50字符内"
        ></el-input>
      </el-form-item>
      <el-form-item label="域 ID">
        <el-input
          v-model="formRole.domain"
          placeholder="请输入域 ID，即 domain_id"
        ></el-input>
      </el-form-item>
      <el-form-item label="API 地址">
        <el-input
          v-model="formRole.api"
          placeholder="请输入对应服务的 API 地址，需以 http(s):// 开头"
        ></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input
          v-model="formRole.user"
          placeholder="请输入你的账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="formRole.pwd"
          placeholder="请输入你的密码"
        ></el-input>
      </el-form-item>
      <el-form-item class="footer">
        <el-button
          size="small"
          v-if="isCreate"
          type="primary"
          @click="handleValidation"
          >验证服务并添加</el-button
        >
        <el-button size="small" v-else type="primary" @click="handleValidation">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseRequest from '@/server/BaseRequest.js';
import DetailRequest from '@/server/DetailRequest.js';
import _ from 'lodash';
import { Loading } from 'element-ui';
import { v4 as uuidv4 } from 'uuid';

const dafultFormRole = process.env.NODE_ENV === 'production'
? ({
  roleName: '',
  user: '',
  pwd: '',
  api: '',
  domain: '',
}) : ({
  roleName: '',
  user: '15992470692',
  pwd: '123456',
  api: 'http://120.236.169.14:7081/v1',
  domain: 'atwork',
});

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
        ...dafultFormRole,
      },
      validation: false, // 添加的服务是否验证成功
    };
  },
  watch: {
    role(val) {
      console.log(val);
      if (val) {
        this.formRole = { ...val };
      }
    },
  },
  computed: {
    isCreate() {
      return this.role === null;
    },
  },
  methods: {
    ...mapActions('Role', ['create', 'update']),
    handleValidation() {
      const loadingInstance = Loading.service({ text: '正在验证服务是否正确' });
      DetailRequest.getToken(this.formRole)
        .then((data) => {
          const token = _.get(data, `data.result.access_token`, '');
          const state = _.get(data, `data.status`, -1);
          const message = _.get(data, `data.message`, '');
          if (state === 0) {
            this.$message({
              message: '服务验证成功',
              type: 'success',
            });
            this.validation = true;
            loadingInstance.close();
            this.handleAddRole();
          } else {
            this.$message.error(message);
            loadingInstance.close();
          }
        })
        .catch((err) => {
          console.log(err);
          loadingInstance.close();
          this.$message.error('服务验证出错');
        });
    },
    handleAddRole() {
      if (this.validation) {
        const role = {
          ...this.formRole,
          lastUpdateTime: Date.now(),
        };

        this.$msgbox.close();
        if (this.isCreate) {
          role.id = uuidv4();
          this.create(role);
        } else {
          role.id = this.role.id;
          this.update(role);
        }
        this.reset();
      } else {
        this.$message.error('请先验证服务是否正确');
      }
    },

    reset() {
      this.formRole = {
        ...dafultFormRole,
      };
      this.validation = false;
    }
  },
};
</script>

<style lang='less'>
</style>