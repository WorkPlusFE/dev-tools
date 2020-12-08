<template>
  <div class="create-dialog create-app">
    <el-form label-position="top" :model="formLabel" style="width: 380px">
      <el-form-item label="应用名称">
        <el-input v-model="formLabel.name"></el-input>
      </el-form-item>
      <el-form-item label="访问地址">
        <el-input v-model="formLabel.address"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          v-model="formLabel.role"
          @change="getOrganiOptions($event)"
          placeholder="请选择角色"
        >
          <el-option
            v-for="item in roleOptions"
            :key="item.id"
            :label="getRole(item)"
            :value="getRole(item)"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织架构">
        <el-select
          v-model="formLabel.organizational"
          placeholder="请选择组织架构"
        >
          <el-option
            v-for="item in organiOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="启动方式">
        <el-select v-model="formLabel.startMode" placeholder="请选择启动方式">
          <el-option
            v-for="item in startModeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="footer">
        <el-button size="small" type="primary" @click="openApp"
          >立即打开</el-button
        >
        <el-button size="small" v-if="isAdd" type="primary" @click="saveApp"
          >添加</el-button
        >
        <el-button size="small" v-else type="primary" @click="editApp"
          >修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BaseRequest from '@/server/BaseRequest.js';
import DetailRequest from '@/server/DetailRequest.js';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { LocalStore } from '@/application/LocalStore';
import { OpenApp } from '@/application/OpenApp.js';

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
        name: '',
        address: '',
        role: '',
        organizational: '',
        startMode: '',
      },
      roleOptions: [],
      organiOptions: [],
      startModeOptions: [
        {
          value: 'externalOpen',
          label: '外部浏览器打开',
        },
        {
          value: 'newBrowserWindow',
          label: '新窗口打开',
        },
        {
          value: 'H5DevTool',
          label: 'H5模拟器',
        },
        {
          value: 'PcDevTool',
          label: 'Pc模拟器',
        },
      ],
    };
  },
  computed: {
    isAdd() {
      return this.app === null;
    },
  },
  methods: {
    ...mapActions('Application', [
      'create',
      'edit'
    ]),
    saveApp(formName) {
      const app = {
        name: this.formLabel.name,
        address: this.formLabel.address,
        role: this.formLabel.role,
        api: this.formLabel.api,
        organizational: this.formLabel.organizational,
        startMode: this.formLabel.startMode,
      };

      this.$msgbox.close();

      if (this.isAdd) {
        app.id = uuidv4();
        this.create(app);
      } else {
        app.id = this.app.id;
        this.update(app);
      }
    },
    openApp() {
      OpenApp.open(this.formLabel);
    },
    getRole(item) {
      return `${item.roleName}_${item.user}`;
    },
    async getOrganiOptions(value) {
      const role = _.find(
        this.roleOptions,
        (o) => `${o.roleName}_${o.user}` == value
      );
      const _this = this;
      if (role) {
        const data = await DetailRequest.getToken(role);
        const token = _.get(data, `data.result.access_token`, '');
        const orgs = await DetailRequest.getOrganization(token, role.api);
        const neworgs = _.map(orgs, (o) => ({
          value: o.org_code,
          label: o.name,
        }));
        this.organiOptions = neworgs;
      } else {
        this.$$message.error('错误');
      }
    },
  },
};
</script>
<style lang='less' scoped>
</style>