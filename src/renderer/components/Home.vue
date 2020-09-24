<template>
  <el-tabs type="border-card">
    <el-tab-pane label="pc应用" class="pc">
      <div class="pc_left pc_commom">
        <div class="pc_item">
          <div class="item_img">图片</div>
          <div class="item_title">标题</div>
        </div>
        <div class="pc_item">
          <div class="item_img">图片2</div>
          <div class="item_title">标题2</div>
        </div>
        <div class="pc_item">
          <div class="item_img">图片</div>
          <div class="item_title">标题</div>
        </div>
        <div class="pc_item">
          <div class="item_img">图片2</div>
          <div class="item_title">标题2</div>
        </div>
        <div class="pc_item">
          <div class="item_img">图片</div>
          <div class="item_title">标题</div>
        </div>
        <div class="pc_item">
          <div class="item_img">图片2</div>
          <div class="item_title">标题2</div>
        </div>
      </div>
      <div class="pc_right pc_commom">应用配置</div>
    </el-tab-pane>
    <el-tab-pane label="mobile应用">配置管理</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'home'
};
</script>
<style lang="less" scoped>
.pc {
  display: flex;
  height: 456px;
  width: 100%;
  .pc_commom {
    width: 60%;
    height: 100%;
  }
  .pc_left {
    // background: #ccc;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    .pc_item {
      width: 20%;
      height: 100px;
      margin-bottom: 5px;
      padding: 10px;
      cursor: pointer;
      .item_img {
        background: crimson;
        width: 100%;
        height: calc(100% - 30px);
      }
      .item_title {
        background: cyan;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  .pc_right {
    background: cornflowerblue;
  }
}
</style>