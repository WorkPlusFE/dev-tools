<template>
<div class='add_app'>
    <el-form label-position="right" label-width="80px" :model="formRole" style="width:380px">
        <el-form-item label="角色名称">
            <el-input v-model="formRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="账号">
            <el-input v-model="formRole.user"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="formRole.pwd"></el-input>
        </el-form-item>
        <el-form-item label="API地址">
            <el-input v-model="formRole.api"></el-input>
        </el-form-item>
        <el-form-item label="域名">
            <el-input v-model="formRole.domain"></el-input>
        </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="handleValidation">服务验证</el-button>
            <el-button type="primary" @click="handleAddRole">添加</el-button>
        </el-form-item>
    </el-form>
   
</div>
</template>

<script>
import BaseRequest from '@/server/BaseRequest.js';
import DetailRequest from '@/server/DetailRequest.js';
import _ from 'lodash';
import { Loading } from 'element-ui';
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props:{

    },
    data() {
        //这里存放数据
        return {
            formRole: {
                roleName: '',
                user: '',
                pwd: '',
                api: '',
                domain: ''
            },
            validation: false, // 添加的服务是否验证成功
            
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleValidation() {
            const loadingInstance = Loading.service({ text: '正在验证服务是否正确' });
            DetailRequest.getToken(this.formRole).then(data=>{
                const token = _.get(data, `data.result.access_token`, '');
                const state = _.get(data,`data.status`,-1);
                const message = _.get(data,`data.message`,'');
                if(state == 0){
                    this.$message({
                        message: '服务验证成功',
                        type: 'success'
                    });
                    this.validation = true;
                    loadingInstance.close();
                }else{
                    this.$message.error(message);
                    loadingInstance.close();
                }
            }).catch(err=>{
                loadingInstance.close();
                this.$message.error('服务验证出错');
            })
        },
        handleAddRole(){
            if(this.validation){
                const options = localStorage.getItem('role_');
                let parseOption = options?JSON.parse(options):[];
                parseOption.push({
                    roleName: this.formRole.roleName,
                    user: this.formRole.user,
                    pwd: this.formRole.pwd,
                    api: this.formRole.api,
                    domain: this.formRole.domain
                })
                const apiStr = JSON.stringify(parseOption);
                console.log(apiStr);
                localStorage.setItem(
                    `role_`,
                    apiStr
                );
                this.validation = false;
                this.$msgbox.close();
            }else{
                this.$message.error('请先验证服务是否正确');
            }
        }
        
        
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前

}
</script>
<style lang='less' scoped>

.add_app{
    width: 200px;
}
</style>