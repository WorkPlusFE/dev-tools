<template>
    <div class='employee' :style='getStyle' @click="handleContact">
        <Avatar></Avatar>
        <div class="employee-right">
            <span>{{org.name}}</span>
            <span>{{org.name}}</span>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/contact/Avatar.vue';
const { remote, ipcRenderer, shell } = window.require('electron');
export default {
    name:'Employee',
    components: {Avatar},
    props:{
        org:{
            type:Object
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
        handleContact() {
            ipcRenderer.send('render-reload',this.org)
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
    .employee-right {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        height: 40px;
        span {
            line-height: 20px;
        }
    }
}

</style>