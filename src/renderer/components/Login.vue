<template>
  <div class="login" >
    <div v-if="!showAdd">
      <div class="select">
        <div class="left">
          <el-select v-model="selectValue" @change="handleSelect" clearable placeholder="请选择">
            <el-option
              v-for="item in selectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="right">
          <el-button @click="handleAdd" title="添加环境" type="primary" icon="el-icon-plus" circle></el-button>
        </div>
        
      </div>
      <div class="input">
        <el-input style="width:240px" v-model="user" placeholder="账号"></el-input>
      </div>
      <div class="input">
        <el-input style="width:240px" v-model="pwd" placeholder="密码"></el-input>
      </div>
      <div class="input btm">
        <el-button round>登陆</el-button>
      </div>
    </div>
    <div v-else >
      <div class="input">
        <span class="span">名称：</span>
        <el-input v-model="name" style="width:180px" placeholder="名称"></el-input>
      </div>
      <div class="input">
        <span class="span">API：</span>
        <el-input v-model="api" style="width:180px" placeholder="API"></el-input>
      </div>
      <div class="input">
        <span class="span">域：</span>
        <el-input v-model="field" style="width:180px" placeholder="域"></el-input>
      </div>
      <div class="input btm">
        <el-button round @click="addEnvironmental">添加</el-button>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      message: '登陆页',
      user: '',
      pwd: '',
      showAdd: false,
      name: '',
      api: '',
      field: '',
      selectOption: [],
      selectValue: '',
    };
  },
  methods: {
    handleAdd() {
      this.showAdd = true;
    },
    addEnvironmental() {
      this.selectOption.push({
        value: this.field + this.api,
        label: this.name,
      });
      this.showAdd = false;
      this.api = '';
      this.field = '';
      this.name = '';
    },
    handleSelect(e) {
      console.log(e);
      this.selectValue = e;
    },
  },
}
</script>

<style lang="less">
.login{
  padding:20px;
  .select{
    display: flex;
    width:100%;
    margin:20px 0px;
    .left{
      margin-right: 10px;
    }
  }
  .input{
    width:100%;
    margin:20px 0px;
  }
  .btm{
    text-align: center;
  }
  .span{
    display: inline-block;
    width: 50px;
  }
}
</style>