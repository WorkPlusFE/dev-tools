<template>
  <div class="main_view">
      {{getRole()}}
      <button @click="handleClick">发送信息</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
const { remote, ipcRenderer, shell } = window.require('electron');
export default {
  name: 'SelectContact',
  components: {  },
  data() {
    return {
     
    };
  },
  computed: {
    
  },
  methods: {
    handleClick() {
        ipcRenderer.send('render-reload', '12345678');
    },
    getParams() {
      const winId = this.$route.query.winId;
      return winId;
    },
    getRole() {
       const key = 'role'+ this.getParams();
       const role = remote.getGlobal('shareRole')[key];
       console.log(role)
       return role;
    }
    
  },

  created() {
   
  },
};
</script>

<style lang='less'>
</style>