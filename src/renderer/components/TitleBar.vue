<template>
  <div class="header">
    <div class="header__title drag">
      {{ titleText }}
      <el-tooltip
        class="item"
        effect="dark"
        placement="right-end"
        :enterable="false"
        v-if="showTips"
      >
        <div slot="content">{{tips}}</div>
        <i class="el-icon-question"></i>
      </el-tooltip>
    </div>
    <div class="header__button" v-if="showBtn" @click="handleClick">
      <i class="icon el-icon-circle-plus"></i>
    </div>
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
    showBtn: {
      type: Boolean,
      default: false,
    },
    tips: {
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {
    showTips() {
      return this.tips && this.tips.trim().length > 0;
    },
  },
  methods: {
    handleClick() {
      this.$emit('handleClick');
    },
  },
};
</script>

<style lang='less'>
@height: 50px;

.header {
  display: flex;
  height: @height;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color);
  background: var(--sidebar-bg-color);
  &__title {
    line-height: 50px;
    font-size: var(--text-title-font-size);
    flex: 1;
    padding-left: 15px;
  }
  &__button {
    width: @height;
    line-height: @height;
    text-align: center;
    color: var(--icon-color-actived);
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: var(--icon-color-actived);
    }
  }
}
</style>