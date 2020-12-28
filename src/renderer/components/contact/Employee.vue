<template>
    <div class='employee' :style='getStyle' @click="handleContact" :key="org.userId+'employee'">
        <span @click.stop v-if="selectType != 'contact'"  class="employee-checkbox">
             <el-checkbox v-model="checked"  @change="checkboxChange"></el-checkbox>
        </span>
        <Avatar :src='org.avatar' :key="org.userId"></Avatar>
        <div class="employee-right">
            <span class="employee-name">{{org.name}}</span>
            <span class="employee-job">{{org.name}}</span>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/contact/Avatar.vue';
import { mapActions } from 'vuex';
const { remote, ipcRenderer, shell } = window.require('electron');
export default {
    name:'Employee',
    components: {Avatar},
    props:{
        org:{
            type:Object
        },
        selectType:{
            type:String
        }
    },
    computed: {
        getStyle() {
            const left = (this.org.level * 20) + 'px';
            const style = {
                paddingLeft: left
            }
            return style;
        }
    },
    methods: {
        ...mapActions('Contact',['changeSelectContact']),
        handleContact() {
            ipcRenderer.send('render-reload',this.org)
        },
        checkboxChange(checked) {
            const obj = {
                data:this.org,
                isAdd:checked,
                isArr:false
            }
            this.changeSelectContact(obj)
        }
    }
}
</script>
<style lang='less' scoped>
.employee {
    display: flex;
    height: 40px;
    padding-left: 24px;
    border-bottom: 1px solid #ccc;
    cursor:pointer;
    .employee-checkbox{
        line-height: 40px;
        margin-right: 10px;
    }
    .employee-right {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        height: 40px;
        span {
            line-height: 20px;
            font-size: 12px;
        }
        
        .employee-name{

        }
        .employee-job {
            font-size: 10px;
            color:#7b6565
        }
    }
}

</style>