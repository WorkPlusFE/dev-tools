<template>
    <div @click="handleClick" class="department" :style='getStyle'>
        <span @click.stop  v-if="selectType != 'contact'">
             <el-checkbox v-model="checked" class="department-checkbox" @change="checkboxChange"></el-checkbox>
        </span>
        <i v-if="isOpen" class="el-icon-arrow-down"></i>
        <i v-else class="el-icon-arrow-right"></i>
        <span class="department-span">{{org.name}}</span>
    </div>
</template>

<script>
import ContactRequest from '@/server/ContactRequest.js';
import { mapActions,mapState } from 'vuex';
export default {
    name:'Department',
    props: {
        departmentName:{
            type:String
        },
        org:{
            type:Object
        },
        selectType:{
            type:String
        }
    },
    data() {
        return {
            isOpen: false,
            checked: false
        }
    },
    computed: { 
        ...mapState('Contact', ['role','token']),
        getStyle() {
            const left = (this.org.level * 20) + 'px';
            const style = {
                paddingLeft: left
            }
            return style;
        }
    },
    components: {},
    methods: {
        ...mapActions('Contact',['changeOrgs','setOrgs','changeSelectContact']),
        handleClick() {
            this.isOpen = !this.isOpen;
            if (this.org.loading) return;
            if (!this.org.open) {
                this.org.loading = true;
                this.changeOrgs(this.org);
                // refreshDatas();
                ContactRequest.loadOrg(this.org,this.role, this.token).then(success => {
                    success.open = true;
                    success.loading = false;
                    this.changeOrgs(success);
                    // this.setOrgs(success);
                    // // refreshDatas();
                })
            } else {
                this.org.open = false;
                this.changeOrgs(this.org);
                // refreshDatas();
            }
        },
        async checkboxChange(check,e) {
            const result = await ContactRequest.getContactByorgId(this.role,this.token,this.org.uuid);
            const obj = {
                            data:result,
                            isAdd:check,
                            isArr:true
                        }
            this.changeSelectContact(obj);
        }
    }
}
</script>
<style lang='less' scoped>
.department {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    .department-checkbox{
        margin: 0 10px;
    }
    .department-span {
        padding-left:10px;
    }
}

</style>