<template>
  <div class="create-dialog create-app">
    <el-form
      label-position="top"
      :model="formLabel"
      :rules="rules"
      ref="appForm"
      style="width: 380px"
    >
      <el-form-item label="应用名称" prop="name">
        <el-input
          v-model="formLabel.name"
          placeholder="请输入应用名称"
          maxlength="30"
          show-word-limit
          autofocus
        ></el-input>
      </el-form-item>
      <el-form-item label="应用描述" prop="description">
        <el-input
          v-model="formLabel.description"
          type="textarea"
          :rows="2"
          placeholder="请输入应用描述，100字符内"
        ></el-input>
      </el-form-item>
      <el-form-item label="访问地址" prop="link">
        <el-input
          v-model="formLabel.link"
          placeholder="请输入应用访问地址，需以 http(s):// 开头"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select
          v-model="formLabel.role"
          placeholder="请选择角色"
          @change="handleRoleChanged"
        >
          <el-option
            v-for="role in roles"
            :key="role.id"
            :label="role.name"
            :value="role.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启动方式" required>
        <el-radio-group v-model="formLabel.startMode">
          <el-radio
            v-for="item in startModeOptions"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item class="footer">
        <el-button size="medium" type="primary" @click="openApp"
          >保存并打开</el-button
        >
        <el-button size="medium" type="primary" @click="saveApp">{{
          isCreate ? '添加应用' : '保存修改'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseRequest from '@/server/BaseRequest.js';
import DetailRequest from '@/server/DetailRequest.js';
import { v4 as uuidv4 } from 'uuid';
import { OpenApp } from '@/application/OpenApp.js';
import { defaultAppInfo } from '@/constants/initialData';

export default {
  props: {
    app: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formLabel: {
        ...defaultAppInfo,
      },
      roleOptions: [],
      organiOptions: [],
      startModeOptions: [
        {
          value: 'externalOpen',
          label: '外部浏览器打开',
        },
        {
          value: 'H5DevTool',
          label: 'H5模拟器',
        },
      ],
      rules: {
        name: [
          { required: true, message: '应用名称不能为空', trigger: 'blur' },
        ],
        description: [
          { min: 1, max: 50, message: '已超出最大字符数 100', trigger: 'blur' },
        ],
        link: [
          { required: true, message: '应用访问地址不能为空', trigger: 'blur' },
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
      },
    };
  },
  computed: {
    isCreate() {
      return this.app === null;
    },
    ...mapGetters('Role', ['roles']),
    ...mapGetters('Application', ['getAppByName']),
  },
  methods: {
    ...mapActions('Application', ['create', 'update']),
    async saveApp() {
      const valid = await this.$refs['appForm'].validate();
      if (!valid) return;

      const storeApp = this.getAppByName(this.formLabel.name);
      if (storeApp) {
        if (this.isCreate || storeApp.id !== this.formLabel.id) {
          return this.$message.error(`应用 [${this.formLabel.name}] 已存在！`);
        }
      }

      const app = {
        ...this.formLabel,
        lastUpdateTime: Date.now(),
      };

      this.$msgbox.close();

      if (this.isCreate) {
        app.id = uuidv4();
        this.create(app);
      } else {
        app.id = this.app.id;
        this.update(app);
      }

      const message = this.isCreate ? '应用创建成功！' : '应用资料已更新！';
      this.$message.success(message);
    },
    openApp() {
      OpenApp.open(this.formLabel);
    },
    handleRoleChanged(val) {
      const role = this.roles.find((role) => role.id === val);
      if (role) this.formLabel.roleName = role.name;
    },
  },
  created() {
    if (!this.isCreate) {
      this.formLabel = { ...this.app };
    }
  },
};
</script>
<style lang='less' scoped>
</style>