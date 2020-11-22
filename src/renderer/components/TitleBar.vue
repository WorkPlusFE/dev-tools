<template>
  <div class="title_bar drag">
    <div class="title">{{ titleText }}</div>
    <div class="btn no_dray" @click="handleClick"><i class="icon el-icon-circle-plus"></i></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    titleText: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    handleClick() {
      this.$emit('handleClick');
    },
  },
};
</script>

<style lang='less'>
@height: 50px;

.title_bar {
  display: flex;
  height: @height;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  color: var(--text-color);
  background: var(--sidebar-bg-color);
  .title {
    line-height: 50px;
    font-size: 14px;
  }
  .btn {
    width: @height;
    line-height: @height;
    text-align: right;
    cursor: pointer;
    color: var(--icon-color-actived);
    font-size: 20px;
    &:hover {
      color: var(--icon-color-actived);
    }
  }
}
</style>