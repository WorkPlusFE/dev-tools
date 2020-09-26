<template>
  <div class="home">
    <div class="drag header">
      <div class="header_icon no_dray">
        <i class="el-icon-close" @click="closeApp"></i>
      </div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="pc应用" class="pc">
        <div class="pc_left pc_commom">
          <div
            class="pc_item"
            v-for="(item,index) of ApplicationList"
            :key="index"
            @click="openApplication(item.url)"
          >
            <div class="item_img">
              <img id="logo" :src="require('@/assets/0.png')" alt="electron-vue" />
            </div>
            <div class="item_title">{{item.name}}</div>
          </div>
          <!-- <div class="pc_item">
          <div class="item_img">
            <img id="logo" src="~@/assets/0.png" alt="electron-vue" />
          </div>
          <div class="item_title">流程大师</div>
          </div>-->
        </div>
        <div class="pc_right pc_commom">
          <div>
            <el-form label-position="right" label-width="80px" :model="formLabelAlign">
              <el-form-item label="应用名称">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="应用链接">
                <el-input v-model="formLabelAlign.url"></el-input>
              </el-form-item>
            </el-form>
            <div class="button">
              <el-button type="primary" round @click="addApplication">添加应用</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="mobile应用">手机页面</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
const { shell } = require('electron');
const { ipcRenderer } = require('electron');
export default {
  name: 'home',
  data() {
    return {
      formLabelAlign: {
        name: '',
        url: ''
      },
      ApplicationList: [
        { name: '流程大师', url: 'www.baidu.com', src: '@/assets/0.png' }
      ]
    };
  },
  methods: {
    addApplication() {
      const key = Math.floor(Math.random() * 6);
      this.ApplicationList.push({
        name: this.formLabelAlign.name,
        url: this.formLabelAlign.url,
        src: `@/assets/${key}.png`
      });
      this.formLabelAlign = { name: '', url: '' };
    },
    openApplication(url) {
      this.$message(url);
      shell.openExternal(url);
    },
    closeApp() {
      ipcRenderer.send('CLOSEAPP');
    }
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'margin:0');
  }
};
</script>
<style lang="less" scoped>
.drag {
  -webkit-app-region: drag;
}
.no_dray {
  -webkit-app-region: no-drag;
}

.home {
  /deep/ .el-tabs--border-card {
    box-shadow: none;
    border-bottom: none;
  }
  margin: 0;
  .header {
    height: 30px;
    line-height: 30px;
    padding-right: 8px;
    .header_icon {
      height: 30px;
      line-height: 30px;
      float: right;
      cursor: pointer;
    }
  }
  .pc {
    display: flex;
    height: 456px;
    width: 100%;
    .pc_commom {
      height: 100%;
    }
    .pc_left {
      width: 60%;
      // background: #ccc;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      align-content: flex-start;
      .pc_item {
        width: 88px;
        height: 120px;
        margin-bottom: 5px;
        padding: 10px;
        cursor: pointer;
        .item_img {
          // background: crimson;
          width: 100%;
          height: calc(100% - 30px);
          img {
            width: 100%;
            height: auto;
          }
        }
        .item_title {
          // background: cyan;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 12px;
        }
      }
    }
    .pc_right {
      width: 40%;
      // background: cornflowerblue;
      .button {
        text-align: center;
      }
    }
  }
}
</style>