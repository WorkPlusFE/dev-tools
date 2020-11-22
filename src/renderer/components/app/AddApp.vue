<template>
<div class='add_app'>
    <el-form label-position="right" label-width="80px" :model="formLabel" style="width:380px">
        <el-form-item label="应用名称">
            <el-input v-model="formLabel.name"></el-input>
        </el-form-item>
        <el-form-item label="访问地址">
            <el-input v-model="formLabel.address"></el-input>
        </el-form-item>
         <el-form-item label="角色">
            <el-select v-model="formLabel.role"  @change="getOrganiOptions" placeholder="请选择角色">
                <el-option
                    v-for="item in roleOptions"
                    :key="item.id"
                    :label="getRole(item)"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item  label="组织架构">
            <el-select v-model="formLabel.organizational" placeholder="请选择组织架构">
                <el-option
                    v-for="item in organiOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="启动方式">
            <el-select v-model="formLabel.startMode" placeholder="请选择启动方式">
                <el-option
                    v-for="item in startModeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="openApp">立即打开</el-button>
            <el-button type="primary" @click="saveApp">保存</el-button>
        </el-form-item>
    </el-form>
   
</div>
</template>

<script>
import BaseRequest from '@/server/BaseRequest.js';
import DetailRequest from '@/server/DetailRequest.js';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { LocalStore } from '@/application/LocalStore';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    props: {

    },
    data() {
        // 这里存放数据
        return {
            formLabel: {
                name: '',
                address: '',
                role: '',
                organizational: '',
                startMode: ''
            },
            roleOptions: [],
            organiOptions: [],
            startModeOptions: [
                {
                    value: 'externalOpen',
                    label: '外部浏览器打开'
                },
                {
                    value: 'newBrowserWindow',
                    label: '新窗口打开'
                },
                {
                    value: 'H5DevTool',
                    label: 'H5模拟器'
                }
            ]

        };
    },
    // 监听属性 类似于data概念
    computed: {

    },
    // 监控data中的数据变化
    watch: {

    },
    // 方法集合
    methods: {
        saveApp(formName) {
            const parseOption = LocalStore.getLocalStoreArr('app_')
            const obj = {
                name: this.formLabel.name,
                address: this.formLabel.address,
                role: this.formLabel.role,
                api: this.formLabel.api,
                organizational: this.formLabel.organizational,
                startMode: this.formLabel.startMode,
                id: uuidv4()
            }
            parseOption.push(obj);
            LocalStore.setLocalStoreArr('app_', parseOption);
            this.formLabel = {
                name: '',
                address: '',
                role: '',
                organizational: '',
                startMode: ''
            }
            this.$msgbox.close();
            this.$emit('handleAddApp', parseOption);
        },
        openApp() {

        },
        getRole(item) {
            return `${item.roleName}_${item.user}`;
        },
        async getOrganiOptions(value) {
            const role = _.find(this.roleOptions, (o) => o.id == value);
            const _this = this;
            if (role) {
                // DetailRequest.getToken(role).then(data=>{
                //     const token = _.get(data, `data.result.access_token`, '');
                //     const api = 'https://api4.workplus.io/v1';
                //     DetailRequest.getOrganization(token,api).then(data=>{
                //         console.log(data);
                //         const orgs =  _.map(data,(o)=>{
                //             return { value:o.org_code,label:o.name}
                //         })
                //         _tihs.organiOptions = orgs;
                //     })
                // })

                const data = await DetailRequest.getToken(role);
                const token = _.get(data, `data.result.access_token`, '');
                const api = 'https://api4.workplus.io/v1';
                const orgs = await DetailRequest.getOrganization(token, api);
                const neworgs = _.map(orgs, (o) => ({ value: o.org_code, label: o.name }))
                this.organiOptions = neworgs;
            } else {
                this.$$message.error('错误');
            }
        }


    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
         const options = localStorage.getItem('role_');
         const parseOption = options ? JSON.parse(options) : [];
         this.roleOptions = parseOption;
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, // 生命周期 - 创建之前

}
</script>
<style lang='less' scoped>

.add_app{
    width: 200px;
}
</style>