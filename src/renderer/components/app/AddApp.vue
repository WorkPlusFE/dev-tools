<template>
  <div class="create-dialog create-app">
    <el-form
      label-position="top"
      :model="formLabel"
      :rules="rules"
      ref="appForm"
      style="width: 380px"
    >
      <el-form-item :label="$t('component.addApp.name.label')" prop="name">
        <el-input
          v-model="formLabel.name"
          :placeholder="$t('component.addApp.name.placeholder')"
          maxlength="20"
          show-word-limit
          :autofocus="true"
          class="app-name-input"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('component.addApp.link.label')" prop="link">
        <el-input
          v-model="formLabel.link"
          :placeholder="$t('component.addApp.link.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('component.addApp.role.label')" prop="role">
        <el-select
          v-model="formLabel.role"
          :placeholder="$t('component.addApp.role.placeholder')"
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
      <el-form-item :label="$t('component.addApp.startMode.label')" required>
        <el-radio-group v-model="formLabel.startMode">
          <el-radio
            v-for="item in startModeOptions"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="$t('component.addApp.description.label')"
        prop="description"
      >
        <el-input
          v-model="formLabel.description"
          type="textarea"
          :rows="2"
          :placeholder="
            $t('component.addApp.description.placeholder', {
              max: descriptionMax,
            })
          "
        ></el-input>
      </el-form-item>

      <el-form-item class="footer">
        <el-button size="medium" type="primary" @click="openApp">{{
          $t('component.addApp.button.saveAndOpen')
        }}</el-button>
        <el-button size="medium" type="primary" @click="saveApp">{{
          isCreate ? buttonLabel.create : buttonLabel.save
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
import { nameValidater, urlValidater } from '@/utils/validate';

export default {
  props: {
    app: {
      type: Object,
      default: null,
    },
    $t: Function,
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
          label: this.$t('component.addApp.startMode.externalOpen'),
        },
        {
          value: 'H5DevTool',
          label: this.$t('component.addApp.startMode.H5DevTool'),
        },
      ],
      descriptionMax: 100,
      buttonLabel: {
        create: this.$t('component.addApp.button.create'),
        save: this.$t('component.addApp.button.save'),
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t('component.addApp.rules.name.require'),
            trigger: 'blur',
          },
          {
            validator: nameValidater(
              this.$t('component.addApp.rules.name.validate')
            ),
            trigger: 'blur',
          },
        ],
        link: [
          {
            required: true,
            message: this.$t('component.addApp.rules.link.require'),
            trigger: 'blur',
          },
          {
            validator: urlValidater(
              this.$t('component.addApp.rules.link.validate')
            ),
            trigger: 'blur',
          },
        ],
        role: [
          {
            required: true,
            message: this.$t('component.addApp.rules.role.require'),
            trigger: 'blur',
          },
        ],
        description: [
          {
            min: 1,
            max: 50,
            message: this.$t('component.addApp.rules.description.validate', {
              max: this.descriptionMax,
            }),
            trigger: 'blur',
          },
        ],
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
      const valid = await this.$refs.appForm.validate();
      if (!valid) return;

      const storeApp = this.getAppByName(this.formLabel.name);
      if (storeApp) {
        if (this.isCreate || storeApp.id !== this.formLabel.id) {
          const msg = this.$t('component.addApp.message.existed', {
            name: this.formLabel.name,
          });
          return this.$message.error(msg);
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

      const message = this.isCreate
        ? this.$t('component.addApp.response.create')
        : this.$t('component.addApp.response.save');
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
  mounted() {
    setTimeout(() => {
      document
        .querySelector('.app-name-input')
        .querySelector('.el-input__inner')
        .focus();
    }, 500);
  },
};
</script>
<style lang='less' scoped>
</style>