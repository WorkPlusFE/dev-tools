<template>
    <div class="navigation">
        <el-button-group>
            <el-button type="primary" icon="el-icon-back" @click="handleBack">返回</el-button>
            <el-button @click="handledevTools" v-if='opendevtools' type="primary">关闭工具<i class="el-icon-setting el-icon--right"></i></el-button>
             <el-button v-else @click="handledevTools" type="primary">打开工具<i class="el-icon-setting el-icon--right"></i></el-button>
        </el-button-group>
    </div>
</template>

<script>
const { remote, ipcRenderer, shell } = window.require('electron');
export default {
    name: 'navigation',
    data() {
        return {
            opendevtools: true,
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
        }
    }
}
</script>

<style scoped>
.navigation{
    z-index: 1000;
}
</style>