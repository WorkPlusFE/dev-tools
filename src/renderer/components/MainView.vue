<template>
<div class='main_view'>
    <TitleBar titleText='应用列表' btnText='添加应用' @handleClick="titleAddApp"/>
    <div class="main_content">
        <div class="search">
             <el-input
                placeholder="请输入内容"
                v-model="searchValue">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        
        <div class="item_list_content" v-if="appOptionsVisible">
            <AppItem v-for="item of filterAppOptions" :key="item.id"
                :appName='item.name' :role='item.role' 
                :startMode='item.startMode'
                :appId='item.id'
                @appDel='itemAppDel'
                @appEdit='itemAppEdit'
                />
            
        </div>
        <div v-else class="item_list_empty">请添加应用</div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TitleBar from '@/components/TitleBar.vue';
import AppItem from '@/components/app/AppItem.vue';
import AddApp from '@/components/app/AddApp.vue';
import {LocalStore} from '@/application/LocalStore';
import _ from 'lodash';
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {TitleBar,AppItem,AddApp},

    data() {
        //这里存放数据
        return {
            searchValue:"",
            appOptions:[],
        };
    },
    //监听属性 类似于data概念
    computed: {
        appOptionsVisible(){
            return this.appOptions.length == 0 ? false : true;
        },
        filterAppOptions() {
            if(this.searchValue == '') {
                return this.appOptions;
            }else{
                const newAppOptions = _.filter(this.appOptions,(o)=>{
                    const index = o.name.indexOf(this.searchValue);
                    return index == -1 ? false : true ;
                })
                return newAppOptions;
            }
        }
    },
    //监控data中的数据变化
    watch: {

    },
    //方法集合
    methods: {
        /**打开添加浮层 */
        titleAddApp() {
            console.log(22);
            const h = this.$createElement;
            const _this = this;
            this.$msgbox({
                title:'创建应用',
                message:h(AddApp,{props:{status:'add'},on:{handleAddApp:_this.AddApp}}),
                showCancelButton:false,
                showConfirmButton:false,
            }).then(()=>{

            }).catch((err)=>{
                console.error(err);
            })
            
        },
        /**删除应用 */
        itemAppDel(appId) {
            const newAppOptions =  _.filter(this.appOptions,(o)=>o.id != appId);
            this.appOptions = newAppOptions;
            LocalStore.setLocalStoreArr('app_',newAppOptions);
        },
        /**打开编辑应用浮层 */
        itemAppEdit(appId) {
            const h = this.$createElement;
            const _this = this;
            this.$msgbox({
                title:'创建应用',
                message:h(AddApp,{props:{status:'edit',appId:appId},on:{handleEditApp:_this.editApp}}),
                showCancelButton:false,
                showConfirmButton:false,
            }).then(()=>{

            }).catch((err)=>{
                console.error(err);
            })
        },
        /**添加浮层里的修改应用 */
        editApp(appOptions){
            this.appOptions = appOptions;
        },
        /**添加浮层里的添加应用 */
        AddApp(options) {
            this.appOptions = options;
        },
        getItemRole(role) {

        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
       const parseOption = LocalStore.getLocalStoreArr('app_');
       this.appOptions = parseOption;  

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

.main_view{
    width: calc(100% - 68px);
    height: 100vh;
    .main_content{
        height: calc(100% - 61px);
        .search{
            height: 60px;
            line-height: 60px;
            padding: 0 18px;
        }
        .item_list_content{
            width: 100%;
            height: calc(100% - 60px);
            overflow: auto;
            // background: #ccc;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            align-content: flex-start;
        }
        .item_list_empty{
            color:#ccc;
            width: 100%;
            /* height: 100%; */
            display: flex;
            /* align-items: center; */
            justify-content: center;
            font-size: 28px;
            padding: 20px 0
        }
    }
    
}
</style>