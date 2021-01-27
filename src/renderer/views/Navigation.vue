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
import _ from 'lodash';
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
             const winId = this.getCurrentWinId();
            ipcRenderer.send('route-back',winId);
        },
        handledevTools() {
            this.opendevtools = !this.opendevtools
            const winId = this.getCurrentWinId();
            if (this.opendevtools) {
                ipcRenderer.send('close-devtools',winId);
            } else {
                ipcRenderer.send('open-devtools',winId);
            }
        },
        handleOver() {
            this.navigationShow = true;
        },
        handleLeave() {
            this.navigationShow = false;
        },
        getCurrentWinId() {
            const winId = _.get(this.$router,`history.current.query.winId`);
            return winId;
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