const { remote, ipcRenderer, shell } = window.require('electron');

import getUrlParams from '../server/getUrlParams';
import store from '../store'

const URL_KEYS = {
  '{{ticket}}': 'ticket',
  '{{userId}}': 'user_id',
  '{{orgId}}': 'org_id',
  '{{domainId}}': 'domain_id',
  '{{language}}': 'language',
  '{{username}}': 'username'
};

/**
 * 应用启动链接添加参数
 * 1、pc外部打开，需要默认拼接全部参数
 * 2、mobile模拟器，按需拼接，如 {{ticket}}将被 ticket 替换，具体查看 https://open.workplus.io/v4/light-app/#启动地址
 * 
 * @param {*} app
 * @param {*} params
 */
const completeAppUrl = (app, params) => {
  const { startMode } = app;
  const prevChat = app.link.indexOf('?') > -1 ? '&' : '?';

  // 替换参数占位符
  params.language = store.getters['Setting/isZhCnLng'] ? 'zh-CN' : 'en';
  for (let key in URL_KEYS) {
    app.link = app.link.replace(new RegExp(key, 'g'), params[URL_KEYS[key]] || '');
  }

  if (startMode === 'externalOpen') {
    return app.link += (`${prevChat}ticket=${params.ticket || ''}` 
    + `&domain_id=${params.domain_id || ''}` 
    + `&user_id=${params.user_id || ''}` 
    + `&org_id=${params.org_id || ''}` 
    + `&username=${params.username || ''}` 
    + `&random=${Date.now()}`);
  }
  return app.link;
};
export class OpenApp {
  /** 打开方式 */
  static open(app, role) {
    const startModal = app.startMode;
    switch (startModal) {
      case 'externalOpen': {
        OpenApp.externalOpen(app, role);
        break;
      }
      case 'H5DevTool': {
        OpenApp.H5DevTool(app, role);
        break;
      }
    }
  }

  /** 外部浏览器打开 */
  static async externalOpen(app, role) {
    const urlParams = await getUrlParams(app, role);
    const appLink = completeAppUrl(app, urlParams);
    
    shell.openExternal(appLink);
  }

  /** 手机调试模式 */
  static async H5DevTool(app, role) {
    const urlParams = await getUrlParams(app, role);
    const appLink = completeAppUrl(app, urlParams);

    ipcRenderer.send('OPEN', appLink);
  }
}
