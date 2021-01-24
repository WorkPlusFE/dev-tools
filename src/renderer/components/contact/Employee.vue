<template>
    <div class='employee' :style='getStyle' @click="handleContact" >
        <span @click.stop v-if="selectType != 'contact'"  class="employee-checkbox">
             <el-checkbox v-model="getchecked"  @change="checkboxChange"></el-checkbox>
        </span>
        <Avatar :src='org.avatar' :key="org.user_id"></Avatar>
        <div class="employee-right">
            <span class="employee-name">{{org.name}}</span>
            <span class="employee-job">{{org.name}}</span>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/contact/Avatar.vue';
import { mapActions, mapState } from 'vuex';
import _ from 'lodash';
import ContactRequest from '@/server/ContactRequest.js';
const { remote, ipcRenderer, shell } = window.require('electron');
export default {
    name: 'Employee',
    components: { Avatar },
    data() {
        return {
        }
    },
    props: {
        org: {
            type: Object
        },
        selectType: {
            type: String
        }
    },
    computed: {
        ...mapState('Contact', ['selectContact', 'role', 'token']),
        getStyle() {
            const left = `${(this.org.level * 20) + 5}px`;
            const style = {
                paddingLeft: left
            }
            return style;
        },
        getchecked() {
            const index = _.findIndex(this.selectContact, (o) => o.user_id == this.org.user_id);
            const bool = index != -1;
            console.log(bool);
            return bool;
        }
    },
    methods: {
        ...mapActions('Contact', ['changeSelectContact']),
        handleContact() {
            ipcRenderer.send('render-reload', this.org)
        },
        async checkboxChange(checked) {
            const data = await ContactRequest.getContactByUserId(this.role, this.token, this.org.user_id)
            console.log(data);
            const obj = {
                data: _.get(data, `[0]`, {}),
                isAdd: checked,
                isArr: false
            }
            this.changeSelectContact(obj)
        }
    }
}
</script>
<style lang='less' scoped>
.employee {
    display: flex;
    height: 40px;
    padding-left: 24px;
    border-bottom: 1px solid #ccc;
    cursor:pointer;
    .employee-checkbox{
        line-height: 40px;
        margin-right: 10px;
    }
    .employee-right {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        height: 40px;
        span {
            line-height: 20px;
            font-size: 12px;
        }
        
        .employee-name{

        }
        .employee-job {
            font-size: 10px;
            color:#7b6565
        }
    }
}

</style>