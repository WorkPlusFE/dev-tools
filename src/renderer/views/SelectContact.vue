<template>
  <div class="main_view">
      <Contact 
        v-for="org of orgsData"
        :key="org.id"
        :department="org.isOrg"
        :org="org"
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
import Contact from '@/components/contact/Contact.vue'
import ContactRequest from '@/server/ContactRequest.js';
import DetailRequest from '@/server/DetailRequest.js';
export default {
  name: 'SelectContact',
  components: { Employee,  Department, Contact},
  data() {
    return {
     orgsData:[]
    };
  },
  computed: {
     ...mapState('Contact', ['orgs','random']),
     ...mapGetters('Role', ['roles']),
     orgWatch(){
          return this.orgs;
     },
     randomWatch() {
       return this.random;
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
    ...mapActions('Contact', ['setOrgs','setToken','setRole']),
    getRole() {
      const key = 'role'+ this.getParams();
      const role = remote.getGlobal('shareRole')[key];
      return role;
      // return this.roles[0];
  
    },
    getParams() {   
      const winId = this.$route.query.winId;
      return winId;
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
    }
  },

  created() {
   
  },
  async mounted() {
    const role = this.getRole();
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
</style>