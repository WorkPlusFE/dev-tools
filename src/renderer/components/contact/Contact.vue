<template>
  
        <Department v-if="department" :org="org" :selectType="selectType"></Department>
        <Employee v-else :org="org" :selectType="selectType"></Employee>

</template>

<script>
import Department from './Department.vue';
import Employee from './Employee.vue';
export default {
    name:'Contact',
    data(){
        return {
        }
    },
    props: {
        department:{
            type:Boolean
        },
        org:{
            type:Object
        },
        selectType:{
            type:String
        }
    },
    components: {Employee, Department},
    mounted() {
    
    }
}
</script>
<style lang='less' scoped>


</style>