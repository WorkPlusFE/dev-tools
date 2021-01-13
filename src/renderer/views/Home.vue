<template>
    <div class="home main_view">
        <Sidebar/>
        <router-view></router-view>
    </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
    name: 'home',
    components: {
        Sidebar,
    },
}
</script>

<style scoped>
.home{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background: var(--bg-color);
    font-size: var(--text-font-size);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>