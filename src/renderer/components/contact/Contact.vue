<template>
    <Department v-if="department" :org="org"></Department>
    <Employee v-else :org="org"></Employee>
</template>

<script>
import Department from './Department.vue';
import Employee from './Employee.vue';
export default {
    name:'Contact',
    props: {
        department:{
            type:Boolean
        },
        org:{
            type:Object
        }
    },
    components: {Employee, Department},
    mounted() {
    
    }
}
</script>
<style lang='less' scoped>


</style>