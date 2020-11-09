<template>
<div class='main_left'>
    <div class="logo el-icon-box drag"></div>
    <div class="content">
        <div class="icon_content">
            <div class="icon el-icon-menu" title="应用"></div>
            <div class="icon el-icon-s-custom" title="角色"></div>
        </div>
        <div class="icon_content">
            <div class="icon el-icon-s-tools" title="设置"></div>
            <div class="icon el-icon-remove" title="关闭"></div>
        </div>
    </div>
    
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {

//import引入的组件需要注入到对象中才能使用
components: {},
data() {
    //这里存放数据
    return {

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
.main_left{
    width:68px;
    height: 100vh;
    background: rgb(40,40,40);
    color:#fff;
    .logo{
        width: 100%;
        height: 72px;
        line-height: 62px;
        text-align: center;
        font-size: 28px;
        color: rgb(5, 95, 247);
    }
    .content{
        width:100%;
        height: calc(100% - 72px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .icon_content{
            width:100%;
            .icon{
                width: 100%;
                height: 60px;
                color: #fff;
                line-height: 60px;
                text-align: center;
                font-size: 22px;
                cursor: pointer; 
            }
            .icon:hover{
                    color:rgb(5, 95, 247);
            }
        }
    }
}
</style>