<template>
  <div class="login">
    <div v-if="!showAdd">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="selectValue">
          <div class="select">
            <div class="left">
              <el-select
                v-model="ruleForm.selectValue"
                @change="handleSelect"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in selectOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="right">
              <el-button @click="handleAdd" title="添加环境" type="primary" icon="el-icon-plus" circle></el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item prop="user">
          <div class="input">
            <el-input style="width:240px" v-model="ruleForm.user" placeholder="账号"></el-input>
          </div>
        </el-form-item>

        <el-form-item prop="pwd">
          <div class="input">
            <el-input style="width:240px" v-model="ruleForm.pwd" placeholder="密码"></el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="input btm">
            <el-button round @click="handleLand">登陆</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <el-form :model="addForm" :rules="addrules" ref="addForm" class="demo-ruleForm">
        <el-form-item prop="name">
          <div class="input">
            <span class="span">名称：</span>
            <el-input v-model="addForm.name" style="width:180px" placeholder="名称"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="api">
          <div class="input">
            <span class="span">API：</span>
            <el-input v-model="addForm.api" style="width:180px" placeholder="API"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="field">
          <div class="input">
            <span class="span">域：</span>
            <el-input v-model="addForm.field" style="width:180px" placeholder="域"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="input btm">
            <el-button round @click="addEnvironmental">添加</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        user: '',
        pwd: '',
        selectValue: ''
      },
      addForm: {
        name: '',
        api: '',
        field: ''
      },
      message: '登陆页',
      showAdd: false,
      selectOption: [],
      rules: {
        selectValue: [{ required: true, message: '请选择', trigger: 'change' }],
        user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      addrules: {
        name: [{ required: true, message: '请输入环境名称', trigger: 'blur' }],
        api: [{ required: true, message: '请输入api', trigger: 'blur' }],
        field: [{ required: true, message: '请输入域', trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleAdd() {
      this.showAdd = true;
    },
    addEnvironmental() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.selectOption.push({
            value: this.addForm.field + this.addForm.api,
            label: this.addForm.name
          });
          this.showAdd = false;
          this.addForm = {
            api: '',
            field: '',
            name: ''
          };
        } else {
          this.$message('请填写完整');
        }
      });
    },
    handleSelect(e) {
      console.log(e);
      this.selectValue = e;
    },
    handleLand() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$message('这是一条消息提示true');
        } else {
          this.$message('这是一条消息提示false');
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  padding: 20px;
  .select {
    display: flex;
    width: 100%;
    margin: 20px 0px;
    .left {
      margin-right: 10px;
    }
  }
  .input {
    width: 100%;
    margin: 20px 0px;
  }
  .btm {
    text-align: center;
  }
  .span {
    display: inline-block;
    width: 50px;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>