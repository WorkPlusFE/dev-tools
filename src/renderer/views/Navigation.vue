<template>
    <div class="navigation" @mouseover="handleOver" @mouseleave="handleLeave">
        <div v-show="navigationShow" class="navigation-content">
            <i class="icon-i back  el-icon-back" @click="handleBack"></i>
            <i class="icon-i tools el-icon-setting" @click="handledevTools"></i>
        </div>
        <div v-show="!navigationShow" class="navigation-shrink">
            <i class="shrink-i el-icon-arrow-down"></i>
        </div>
    </div>
</template>

<script>
const { remote, ipcRenderer, shell } = window.require('electron');
export default {
    name: 'navigation',
    data() {
        return {
            opendevtools: true,
            navigationShow: false
        }
    },
    methods: {
        handleBack() {
            ipcRenderer.send('route-back');
        },
        handledevTools() {
            this.opendevtools = !this.opendevtools
            if (this.opendevtools) {
                ipcRenderer.send('close-devtools');
            } else {
                ipcRenderer.send('open-devtools');
            }
        },
        handleOver() {
            this.navigationShow = true;
        },
        handleLeave() {
            this.navigationShow = false;
        }
    }
}
</script>

<style scoped lang='less'>
.navigation{
    z-index: 1000;
    .navigation-content{
        display: flex;
        padding-left: 5px;
        padding-top: 5px;
        .icon-i{
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(27, 118, 230, 0.2);
            font-size: 28px;
            width:50px;
            height: 40px;
            color:#edeef4;
            cursor: pointer;
        }
        .back{
            border-right: 1px solid #fff;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }
        .tools{
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
    .navigation-shrink{
        width: 100px;
        height: 20px;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background: rgba(27, 118, 230, 0.2);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        .shrink-i {
             color:#edeef4;
        }
    }
}
</style>