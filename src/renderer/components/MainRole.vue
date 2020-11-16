<template>
<div class='main_view'>
    <TitleBar titleText='角色管理' btnText='添加角色' />
    <div class="main_content">
        <div class="item_list_content">
            <AppItem appName='角色人员' role='测试环境-陈工' startMode='外部启动'/>
            <AppItem appName='角色人员' role='测试环境-陈工' startMode='外部启动'/>
            <AppItem appName='角色人员' role='测试环境-陈工' startMode='外部启动'/>
            <AppItem appName='角色人员' role='测试环境-陈工' startMode='外部启动'/>
            <AppItem appName='角色人员' role='测试环境-陈工' startMode='外部启动'/>
            <AppItem appName='角色人员' role='测试环境-陈工' startMode='外部启动'/>
        </div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TitleBar from '@/components/TitleBar.vue';
import AppItem from '@/components/app/AppItem.vue';
export default {
name: 'MainRole',
components: {TitleBar,AppItem},
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
        .item_list_content{
            width: 100%;
            height: calc(100% - 40px);
            overflow: auto;
            // background: #ccc;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            padding:20px 0;
        }
    }
    
}
</style>