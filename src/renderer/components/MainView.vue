<template>
<div class='main_view'>
    <TitleBar titleText='应用列表' btnText='添加应用' @handleClick="addApp"/>
    <div class="main_content">
        <div class="search">
             <el-input
                placeholder="请输入内容"
                v-model="searchValue">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        
        <div class="item_list_content">
            <AppItem appName='测试服务' role='测试环境-陈工' startMode='外部启动'/>
            <AppItem appName='测试服务' role='测试环境-陈工' startMode='外部启动'/>
            <AppItem appName='测试服务' role='测试环境-陈工' startMode='外部启动'/>
            <AppItem appName='测试服务' role='测试环境-陈工' startMode='外部启动'/>
            <AppItem appName='测试服务' role='测试环境-陈工' startMode='外部启动'/>
            <AppItem appName='测试服务' role='测试环境-陈工' startMode='外部启动'/>
        </div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TitleBar from '@/components/TitleBar.vue';
import AppItem from '@/components/app/AppItem.vue';
import AddApp from '@/components/app/AddApp.vue';
export default {
//import引入的组件需要注入到对象中才能使用
components: {TitleBar,AppItem,AddApp},

data() {
    //这里存放数据
    return {
        searchValue:""
    };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    addApp() {
        console.log(22);
        const h = this.$createElement;
        this.$msgbox({
            title:'创建应用',
            message:h(AddApp),
            showCancelButton:false,
            showConfirmButton:false,
        }).then(()=>{

        }).catch((err)=>{
            console.error(err);
        })
        
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
    }
    
}
</style>