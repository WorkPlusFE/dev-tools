<template>
<div class="full_div defalut_bg content">
  <div class="top drag"></div>
  <div class="login">
    <div class="login-top">
      <div :class="{topitem:true,'active':active=='login'}" @click="handleTop('login')">登录服务</div>
      <div :class="{topitem:true,'active':active=='register'}" @click="handleTop('register')">注册接口</div>
    </div>
    <div class="login_content">
      <div v-if="active == 'login'" class="content">
        <div class="input_item" style="display:flex">
          <span class="item_span">选择接口</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="input_item">
          <el-input placeholder="请输入账号" v-model="input1">
            <template slot="prepend">账 &nbsp;&nbsp;&nbsp;&nbsp;   号</template>
          </el-input>
        </div>
        <div class="input_item">
          <el-input placeholder="请输入密码" v-model="input1">
            <template slot="prepend">密  &nbsp;&nbsp;&nbsp;&nbsp;  码</template>
          </el-input>
        </div>
        <div class="input_item">
          <div class="register_btn">登录</div>
        </div>
      </div>
      <div v-if="active == 'register'" class="content">
        <div class="input_item">
          <el-input placeholder="请输入内容" v-model="input1">
            <template slot="prepend">接口名称</template>
          </el-input>
        </div>
        <div class="input_item">
          <el-input placeholder="请输入内容" v-model="input1">
            <template slot="prepend">接口地址</template>
          </el-input>
        </div>
        <div class="input_item">
          <el-input placeholder="请输入内容" v-model="input1">
            <template slot="prepend">接口域名</template>
          </el-input>
        </div>
        <div class="input_item">
          <div class="register_btn">添加接口</div>
        </div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
// import BaseRequest from '@/server/BaseRequest.js';
// import _ from 'lodash';
// import { ipcRenderer } from 'electron';
// import { Loading } from 'element-ui';
export default {
  name: 'login',
  data() {
    return {
      active: 'login',
      selectOptions:[]  
    }
  },
  methods: {
    handleTop(topState) {
      this.active = topState;
    }
  }
};
</script>

<style lang="less">
.content{
  position: relative;    
}
.top{
  width: 100%;
  height: 30px;
  // background: #ccc; 
}
.login {
  // elmentUI
  .el-input-group__prepend{
    background-color: rgb(64,64,64);
    border:none;
  }
  .el-input__inner{
    background-color: rgb(40,40,40);
    border:1px solid;
    border-radius: 0px;
  }
  .el-input__inner:focus{
    border-color:rgb(195, 183, 183)
  }
  .el-select .el-input.is-focus .el-input__inner{
    border-color:rgb(195, 183, 183)
  }
  .el-select{
    flex: 1;
  }
  background:rgb(40,40,40);
  width: 400px;
  height: 340px;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  .login-top{
    height: 50px;
    width: 100%;
    display: flex;
    background: rgb(48,48,48);
    .topitem{
      width: 50%;
      height: 100%;
      text-align: center;
      line-height: 50px;
      color: #6c757d;
      cursor: pointer;
    }
    .active{
      font-size:24px;
    }
  }
  .login_content{
    width: 100%;
    height: calc(100% - 50px);
    .content{
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-content: flex-start;
      flex-wrap: wrap;
      .input_item{
        width: 80%;
        margin-top:20px;
        .item_span{
          width:90px;
          line-height: 38px;
          text-align: center;
          background: #404040;
          color:#909399;
          font-size: 14px;
        }
      }
      .register_btn{
        width: 100%;
        height: 40px;
        background: #404040;
        line-height: 40px;
        text-align: center;
        color: #9c9595;
        font-size: 20px;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>