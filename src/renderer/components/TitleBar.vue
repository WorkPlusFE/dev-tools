<template>
<div class='title_bar'>
    <div class="title">{{titleText}}</div>
    <div class="btn no_dray" @click="handleClick">{{btnText}}</div>
</div>
</template>

<script>

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:{
    titleText:{
        type:String,
        required:true
    },
    btnText:{
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
    handleClick() {
        this.$emit('handleClick')
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
.title_bar{
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    .title{
        line-height: 60px;
    }
    .btn{
        width: 86px;
        height: 30px;
        line-height: 30px;
        background: rgb(49,156,249);
        text-align: center;
        border-radius: 8px;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
    }
}
</style>