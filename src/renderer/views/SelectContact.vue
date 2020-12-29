<template>
  <div class="main_view">
    <div class="search">
      <el-input placeholder="搜索" v-model="searchInpub" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="select-content" v-if="showSelectContact">
      <div class="avatar-content">
          <Avatar
          v-for="org of selectContact"
          :key="org.userId"
          :src='org.avatar'
        />
         <div class="select-btn" @click="handleClickSelect">
          确定({{selectContactSize}})
        </div>
      </div>
      <!-- <div class="select-btn">
        确定({{selectContactSize}})
      </div> -->
    </div>
      <Contact 
        v-for="org of orgsData"
        :key="org.id"
        :department="org.isOrg"
        :org="org"
        :selectType="contactType"
      />
  </div>
</template>

<script>
import { mapGetters, mapActions,mapState } from 'vuex';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
const { remote, ipcRenderer, shell } = window.require('electron');
import Department from '@/components/contact/Department.vue'
import Employee from '@/components/contact/Employee.vue'
import Avatar from '@/components/contact/Avatar.vue'
import Contact from '@/components/contact/Contact.vue'
import ContactRequest from '@/server/ContactRequest.js';
import DetailRequest from '@/server/DetailRequest.js';
export default {
  name: 'SelectContact',
  components: { Employee,  Department, Contact, Avatar},
  data() {
    return {
     orgsData:[],
     searchInpub:'',
     contactType: '',
    };
  },
  computed: {
     ...mapState('Contact', ['orgs','random','selectContact']),
     ...mapGetters('Role', ['roles']),
     orgWatch(){
          return this.orgs;
     },
     randomWatch() {
       return this.random;
     },
     showSelectContact() {
      return _.size(this.selectContact) > 0;
    },
    selectContactSize() {
      return _.size(this.selectContact);
    }

  },
  watch:{
    orgWatch(newOrgs,oldOrgs) {
      this.refreshDatas(newOrgs);
    },
    randomWatch() {
      this.refreshDatas(this.orgs);
    }
    
  },
  methods: {
    ...mapActions('Contact', ['setOrgs','setToken','setRole','delectSelectContact']),
    getRole() {
      const key = 'role'+ this.getParams();
      const role = remote.getGlobal('shareRole')[key];
      // return role;
      return this.roles[0];
  
    },
    getParams() {   
      const winId = this.$route.query.winId;
      return winId;
    },
    getContactType() {
      const type = this.$route.query.type;
      this.contactType = type;
    },
    refreshDatas(orgs) {
        const datas = [];
        orgs.forEach(org => {
            this.pushOrg(org, datas);
        })
        console.log(datas);
        this.orgsData = datas;
    },
    pushOrg(org, datas) {
        datas.push(org);
        if (org.open) {
            _.forEach(org.employees, employee => {
                datas.push(employee);
            })
            _.forEach(org.subOrgs, subOrg => {
                this.pushOrg(subOrg, datas);
            })
        }
    },
    handleClickSelect() {
      if(this.contactType == 'contacts') {
        ipcRenderer.send('render-reload-getContacts',this.selectContact)
      }
      this.delectSelectContact();
      this.$router.push('/')
    }
  },

  created() {
   
  },
  async mounted() {
    const role = this.getRole();
    this.getContactType();
    this.setRole(role);
    const TokenObject = await DetailRequest.getToken(role);
    const token = _.get(TokenObject,'data.result.access_token','');
    ContactRequest.fetchOrgs(role,token).then(data => {
      console.log(data)
      this.setOrgs(data);
      this.setToken(token);
      // this.refreshDatas(data);
    })
  }
};
</script>

<style lang='less'>
.main_view{
  overflow: auto;
  .search{
    margin: 10px;
  }
  .select-content{
      // height: 40px;
      display: flex;
      justify-content:space-between;
      .avatar-content{
        flex: 1;
        display: flex;
        padding: 0 5px;
        flex-wrap: wrap;
        // overflow-x:auto;
      }
      .select-btn{
        width: 60px;
        cursor: pointer;
        font-size: 14px;
        line-height: 40px;
        margin-left: 10px;
        color: #3a8ee6;
      }

  }
}
</style>