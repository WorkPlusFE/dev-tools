<template>
  <div class="select-cntact ">
    <div class="contact-orglist">
       <Contact
      v-for="org of orgsData"
      :key="org.id"
      :department="org.isOrg"
      :org="org"
      :selectType="contactType"
    />
    </div>
   
    <div class="select-content" v-show="butShow">
      <div class="avatar-content">
        <Avatar
          v-for="org of selectContact"
          :key="org.userId"
          :src="org.avatar"
        />
      </div>
      <div class="select-btn" @click="handleClickSelect">确定({{ selectContactSize }})</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Department from '@/components/contact/Department.vue';
import Employee from '@/components/contact/Employee.vue';
import Avatar from '@/components/contact/Avatar.vue';
import Contact from '@/components/contact/Contact.vue';
import ContactRequest from '@/server/ContactRequest.js';
import DetailRequest from '@/server/DetailRequest.js';
const { remote, ipcRenderer, shell } = window.require('electron');
export default {
  name: 'SelectContact',
  components: {
 Employee, Department, Contact, Avatar
},
  data() {
    return {
      orgsData: [],
      searchInpub: '',
      contactType: 'contact',
    };
  },
  computed: {
    ...mapState('Contact', ['orgs', 'random', 'selectContact', 'role']),
    ...mapGetters('Role', ['roles']),
    orgWatch() {
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
    },
    butShow() {
      return this.contactType != 'contact' && _.size(this.selectContact) > 0
    }
  },
  watch: {
    orgWatch(newOrgs, oldOrgs) {
      this.refreshDatas(newOrgs);
    },
    randomWatch() {
      this.refreshDatas(this.orgs);
    },
  },
  methods: {
    ...mapActions('Contact', [
      'setOrgs',
      'setToken',
      'setRole',
      'delectSelectContact',
    ]),
    getRole(winid) {
      const key = `role${winid}`;
      const role = remote.getGlobal('shareRole')[key];
      // return role;
      return this.roles[0];
    },
    refreshDatas(orgs) {
      const datas = [];
      orgs.forEach((org) => {
        this.pushOrg(org, datas);
      });
      console.log(datas);
      this.orgsData = datas;
    },
    pushOrg(org, datas) {
      datas.push(org);
      if (org.open) {
        _.forEach(org.employees, (employee) => {
          datas.push(employee);
        });
        _.forEach(org.subOrgs, (subOrg) => {
          this.pushOrg(subOrg, datas);
        });
      }
    },
    handleClickSelect() {
      if (this.contactType == 'contacts') {
        ipcRenderer.send('render-reload-getContacts', this.selectContact);
      }
      this.delectSelectContact();
    },
    rendererListen() {
      ipcRenderer.on('open-select-contact', async (event, arg, type) => {
        console.log('open-select-contact');
        this.contactType = type;
        const role = this.getRole(arg);
        this.setRole(role);
        const TokenObject = await DetailRequest.getToken(role);
        const token = _.get(TokenObject, 'data.result.access_token', '');
        console.log({
           token, role, arg, type
        });
        ContactRequest.fetchOrgs(role, token).then((data) => {
          console.log(data);
          const filterData = _.filter(data,(o)=> o.orgCode == role.orgId);
          this.setOrgs(filterData);
          this.setToken(token);
        });
      })
    },
    async testLister() {
      const role = {
        api: "https://api4.workplus.io/v1",
        domain: "workplus",
        id: "94babd68-7a04-4dd2-8246-296e08491d90",
        lastUpdateTime: 1610420562767,
        name: "cjl_生产",
        orgId: "c8522121-c038-4de1-8e8e-cb8ab6a6d32f",
        orgName: "深圳恒拓高科信息技术有限公司",
        pwd: "Log123456",
        user: "13750004979"
      }
      this.setRole(role);
      const TokenObject = await DetailRequest.getToken(role);
      const token = _.get(TokenObject, 'data.result.access_token', '');
      ContactRequest.fetchOrgs(role, token).then((data) => {
          console.log(data);
          const filterData = _.filter(data,(o)=> o.orgCode == role.orgId);
          this.setOrgs(filterData);
          this.setToken(token);
        });
    }
  },

  created() {},
  async mounted() {
    this.rendererListen(); 
    // this.testLister();
  },
};
</script>

<style lang='less' scoped>
.select-cntact {
  margin-top:10px;
  overflow: auto;
  flex: 1;
  /* height: 100vh; */
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  .contact-orglist{
    flex:1;
    overflow: auto;
  }
  .search {
    margin: 10px;
    display: flex;
  }
  .select-btn {
    width: 60px;
    cursor: pointer;
    font-size: 14px;
    line-height: 40px;
    margin-left: 10px;
    color: #3a8ee6;
  }
  .select-content {
    // height: 40px;
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
    .avatar-content {
      flex: 1;
      display: flex;
      padding: 0 5px;
      // flex-wrap: wrap;
      overflow-x: auto;
    }
  }
}
</style>