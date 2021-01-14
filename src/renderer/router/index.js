import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  base: '/',
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: require('@/views/Home').default,
      children: [
        {
          path: '/',
          name: 'application',
          component: require('@/views/Application').default,
        },
        {
          path: '/role',
          name: 'role',
          component: require('@/views/Role').default,
        },
        {
          path: '/setting',
          component: require('@/views/Setting/Index').default,
          children: [
            {
              path: '/',
              name: 'settingList',
              component: require('@/views/Setting/SettingList').default,
            },
            {
              path: '/params',
              name: 'paramsSetting',
              component: require('@/views/Setting/ParamsSetting').default,
            },
          ],
        },
      ]
    },
    {
      path: '/selectcontact',
      name: 'selectcontact',
      component: require('@/views/SelectContact').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
