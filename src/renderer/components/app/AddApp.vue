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
            <el-select v-model="formLabel.role" placeholder="请选择角色">
                <el-option
                    v-for="item in roleOptions"
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
            <el-button type="primary" @click="submitForm('formLabel')">立即创建</el-button>
            <el-button @click="resetForm('formLabel')">重置</el-button>
        </el-form-item>
    </el-form>
   
</div>
</template>

<script>
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:{

},
data() {
    //这里存放数据
    return {
        formLabel: {
          name: '',
          address: '',
          role: '',
          startMode: ''
        },
        roleOptions:[],
        startModeOptions:[]
        
    };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    resetForm(formName){
        // this.$refs[formName].resetFields();
    },
    submitForm(){

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