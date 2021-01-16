<template>
    <div @click="handleClick" class="department" :style='getStyle'>
        <i v-if="isOpen" class="el-icon-arrow-down"></i>
        <i v-else class="el-icon-arrow-right"></i>
        <span class="department-span">{{org.name}}</span>
    </div>
</template>

<script>
import ContactRequest from '@/server/ContactRequest.js';
import { mapActions, mapState } from 'vuex';
import _ from 'lodash';
export default {
    name: 'Department',
    props: {
        departmentName: {
            type: String
        },
        org: {
            type: Object
        },
        selectType: {
            type: String
        }
    },
    data() {
        return {
            isOpen: false,
            checked: false
        }
    },
    computed: {
        ...mapState('Contact', ['role', 'token','selectContact']),
        getStyle() {
            const left = `${(this.org.level * 20) + 5}px`;
            const style = {
                paddingLeft: left
            }
            return style;
        }
        
    },
    components: {},
    methods: {
        ...mapActions('Contact', ['changeOrgs', 'setOrgs', 'changeSelectContact','changeRandom']),
        handleClick() {
            this.isOpen = !this.isOpen;
            if (this.org.loading) return;
            if (!this.org.open) {
                this.org.loading = true;
                this.changeOrgs(this.org);
                // refreshDatas();
                ContactRequest.loadOrg(this.org, this.role, this.token).then(success => {
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
             this.changeRandom();
        },
        async checkboxChange(check, e) {
            const result = await ContactRequest.getContactByorgId(this.role, this.token, this.org.uuid);
            const obj = {
                            data: result,
                            isAdd: check,
                            isArr: true
                        }
            this.changeSelectContact(obj);
            this.checked = !this.checked;
            this.changeRandom();
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