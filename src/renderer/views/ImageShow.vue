<template>
    <div class="imageshow">
        <div class="imageshow-title drag">
            <span>图片预览</span>
            <i class="el-icon-error title-icon no_dray" @click="handleClose"></i>
        </div>
        <div class="imageshow-content">
            <el-carousel indicator-position="outside" height="calc(100% - 26px)">
                <el-carousel-item v-for="item in imageData" :key="item">
                    <img className='video_message_div' :src='item' />
                </el-carousel-item>
            </el-carousel>
            
        </div>
    </div>
</template>

<script>
const { remote, ipcRenderer, shell } = window.require('electron');
const fs = window.require("fs");
import _ from 'lodash';
export default {
    name: 'imageshow',
    data() {
        return {
            opendevtools: true,
            imageContent:'',
            imageData:[]
        }
    },
    mounted() {
        this.rendererLister();
    },
    methods: {
       rendererLister() {
           ipcRenderer.on('image-show', async (event, arg) => {
               console.log(arg);
               _.forEach(arg,async (item,index)=>{
                   if(this.isImage(item)) {
                       const imagecontent = await this.getImageContent(item);
                       this.imageData.push(imagecontent);
                   }
               })
           })
       },
       handleClose() {
           this.imageData = [];
          ipcRenderer.send('render-image-show');
       },
       getImageContent(path) {
           return new Promise((resolve,reject) => {
               fs.readFile(path, function read(err, data) {
                   var file = new File([data], 'AnyName.jpg', { type: 'image/jpg' });
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(e) {
                        var newUrl = e.currentTarget.result;
                        console.log(newUrl);
                        resolve(newUrl)
                    };
               });
           })
       },
       isImage(path) {
           var reg = /\.(png|jpg|gif|jpeg|webp)$/;
           return reg.test(path);
       }
    }
}
</script>

<style scoped lang='less'>
.imageshow{
    display: flex;
    flex-direction: column;
    width: 100%;
   .imageshow-title{
       display: flex;
       justify-content: center;
        align-items: center;
       position: relative;
       height: 30px;
       background: #ccc;
       .title-icon{
           position: absolute;
           right: 10px;
           cursor: pointer;
       }
   }
   .imageshow-content{
       flex:1;
       display: flex;
       justify-content: center;
       align-items: center;
        
        .imageshow .imageshow-content .el-carousel__item{
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
        }
        .el-carousel--horizontal{
            width: 100%;
            height: 100%;
        }
   }
   .el-carousel__item{
        display: flex;
        justify-content: center;
        align-items: center;
   }
   .el-carousel__container{
            height: 100% !important;
    }
}
</style>