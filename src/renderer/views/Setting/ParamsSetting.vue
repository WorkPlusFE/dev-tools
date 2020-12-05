<template>
  <div class="main_view">
    <TitleBar :titleText="$t('page.paramsSetting.title')" />
    <div class="main_content">
      <ul class="params">
        <li class="param" v-for="param in params" :key="param.id">
          <div class="param__label">
            {{param.label}}
          </div>
          <div class="param__key">
            {{param.key}}
          </div>
        </li>
      </ul>
      <div class="current-params">
        <h3>{{$t('page.paramsSetting.tips.title')}}</h3>
        <p>{{currentLink}}</p>
      </div>
      <div class="tips" v-html="$t('page.paramsSetting.tips.message')"></div>
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';

export default {
  name: 'params-setting',
  data() {
    return {
      params: [{
        id: 1,
        selected: true,
        label: this.$t('page.paramsSetting.label.ticket'),
        origin: 'ticket',
        key: 'ticket'
      }, {
        id: 2,
        selected: true,
        label: this.$t('page.paramsSetting.label.username'),
        origin: 'username',
        key: 'username'
      }, {
        id: 3,
        selected: true,
        label: this.$t('page.paramsSetting.label.userId'),
        origin: 'user_id',
        key: 'user_id'
      }, {
        id: 4,
        selected: true,
        label: this.$t('page.paramsSetting.label.orgId'),
        origin: 'org_id',
        key: 'org_id'
      }, {
        id: 5,
        selected: true,
        label: this.$t('page.paramsSetting.label.domainId'),
        origin: 'domain_id',
        key: 'domain_id'
      }, {
        id: 8,
        selected: true,
        label: this.$t('page.paramsSetting.label.random'),
        origin: 'random',
        key: 'random'
      }],
    };
  },
  computed: {
    currentLink() {
      const queryString = this.params
        .filter(param => param.selected)
        .map((param) => {
          return `${param.key}={{${param.label.replace(' ', '_')}}}`;
        });

      return `http://test.link?${queryString.join('&')}`;
    },
  },
  components: {
    TitleBar,
  },
};
</script>

<style lang="less">
.current-params {
  border-top: 1px solid var(--border-color);
  padding: 15px;
  h3 {
    font-size: 14px;
    font-weight: normal;
    padding-bottom: 8px;
    color: var(--text-color);
  }
  p {
    font-size: 12px;
    text-align: justify;
    color: var(--text-primary-color);
    word-break: break-all;
  }
}
.params {
  border-top: 1px solid var(--border-color);
  margin-top: 40px;
  .param {
    display: flex;
    padding: 8px 15px;
    border-bottom: 1px solid var(--border-color);
    font-size: 14px;
    > div {
      flex: 1;
    }
    &__label {
      color: var(--text-color);
    }
    &__key {
      text-align: right;
      color: var(--text-primary-color);
    }
  }
}

.tips {
  color: var(--text-color);
  font-size: 13px;
  margin: 15px;
  border-radius: 10px;
  padding: 10px;
  background: var(--hover-bg-color);
  word-spacing: normal;
  word-break: break-all;
  a {
    color: var(--text-primary-color);
  }
}
</style>