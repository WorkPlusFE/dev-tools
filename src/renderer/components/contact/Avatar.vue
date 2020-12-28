<template>
    <div class='avatar'>
        <el-avatar 
            icon="el-icon-user-solid"
            size="small"
            :src="getSrc">
        </el-avatar>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:'Avatar',
    props: {
        src:{
            type:String
        }
    },
    computed: {
        ...mapState('Contact',['token','role']),
        getSrc() {
            if(this.src){
                return this.getImg();
            }else{
                return 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            }
        }
    },
    components: {},
    methods: {
        getImg(src) {
             const url = this.role.api + '/medias/' + this.src + '?access_token=' + this.token + '&domain_id=' + this.role.domain;
             return url;
        }
    }
}
</script>
<style lang='less' scoped>
.avatar{
    display: flex;
    align-items: center;
}

</style>