<template>
<div class='app_item'>
    <div class="top">
        <div class="app_name">{{appName}}</div>
        <div>
            <span @click="appEdit">编辑</span>
            <span @click="appDel">删除</span>
        </div>
    </div>
    <div class="content">
        <div class="describe">角色：{{role}}</div>
        <div class="describe">启动方式：{{startMode}}</div>
    </div>
    
</div>
</template>

<script>
import {LocalStore} from '@/application/LocalStore';
import _ from 'lodash';
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props:{
        appName:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        startMode:{
            type:String,
            required:true
        },
        appId:{
            type:String,
            required:true
        }
    },
    data() {
        //这里存放数据
        return {

        };
    },
    //监听属性 类似于data概念
    computed: {
        
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        appDel() {
            this.$emit('appDel',this.appId);
        },
        appEdit() {
            this.$emit('appEdit',this.appId);
        },
        roleName(role) {
            const appOptions = LocalStore.getLocalStoreArr('app_');
            const appItem = _.find(appOptions,(o)=>o.id == role);
            return appItem.name + '_' + appItem.user;
        }
        
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.app_item{
    width: 414px;
    height: 120px;
    border: 1px solid #f0e2e2;
    border-radius: 4px;
    margin-bottom: 20px;
    cursor: pointer;
    .top{
        height: 50px;
        line-height: 50px;
        display: flex;
        padding: 0 10px;
        justify-content: space-between;
        .app_name{
            font-weight: 600;
        }
        span{
            &:hover{
                color:rgb(60, 60, 235);
            }
            margin-left:10px;
            cursor: pointer;
        }

    }
    .content{
        .describe{
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
        }
    }
}
</style>