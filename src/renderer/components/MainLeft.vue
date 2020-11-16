<template>
<div class='main_left'>
    <div class="logo el-icon-box drag"></div>
    <div class="content">
        <div class="icon_content">
            <div :class="{icon:true,'el-icon-menu':true,tab:currentTab=='app'}" title="应用" @click="handleTab('app')"></div>
            <div :class="{icon:true, 'el-icon-s-custom':true,tab:currentTab=='role'}" title="角色" @click="handleTab('role')"></div>
        </div>
        <div class="icon_content">
            <div :class="{icon:true, 'el-icon-s-tools':true,tab:currentTab=='setting'}" title="设置" @click="handleTab('setting')"></div>
            <div class="icon el-icon-remove"  title="关闭"></div>
        </div>
    </div>
    
</div>
</template>

<script>
import eventBus from '@/eventBus.js';

export default {

//import引入的组件需要注入到对象中才能使用
components: {},
props:{
    currentTab:{
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
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    handleTab(key) {
        eventBus.$emit('CHANGE_TAB',key)
    },
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
            .tab{
                background: cornflowerblue;
            }
            // .icon:hover{
            //         color:rgb(5, 95, 247);
            // }
        }
    }
}
</style>