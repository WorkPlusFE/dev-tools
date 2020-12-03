<template>
  <div class="header">
    <div class="header__title drag">{{ titleText }}</div>
    <div class="header__button" v-if="showBtn" @click="handleClick"><i class="icon el-icon-circle-plus"></i></div>
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

.header {
  display: flex;
  height: @height;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color);
  background: var(--sidebar-bg-color);
  &__title {
    line-height: 50px;
    font-size: 14px;
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