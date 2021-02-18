import {
  remote,
  clipboard
} from 'electron'
import _ from 'lodash';
const {
  ipcMain,
  dialog
} = remote;
const Cordova = require('./cordova').default
export const getRole = () => {
  const key = `role${remote.getCurrentWindow().id}`
  const role = remote.getGlobal('shareRole')[key];
  return role;
}
export const getMainWin = () => remote.getGlobal('shareRole').mainwin
export const getBus = () => remote.getGlobal('shareRole').bus;
export const getContactWin = () => remote.getGlobal('shareRole').contactWin
export const openContact = (type) => {
  const mainwin = getMainWin();
  mainwin.show();
  mainwin.webContents.send('open-select-contact', remote.getCurrentWindow().id, type);
}
const key = `otherWindow${remote.getCurrentWindow().id}`;
export const getOtherWin = () => remote.getGlobal('shareRole')[key];
export const getImageShowWin = () => remote.getGlobal('shareRole').imageShowWindow;

export const isCurrentWin = (winId) => remote.getCurrentWindow().id == winId;
const listenNavition = () => {
  ipcMain.on('route-back', (event, arg) => {
    if (isCurrentWin(arg)) {
      window.history.go(-1);
    }
  });

  ipcMain.on('route-forward', (event, arg) => {
    if (isCurrentWin(arg)) {
      window.history.forward();
    }
  });

  ipcMain.on('page-refresh', (event, arg) => {
    if (isCurrentWin(arg)) {
      window.location.reload();
    }
  });

  ipcMain.on('toggle-bar', (event, winId, toggle) => {
    if (isCurrentWin(winId)) {
      const browserView = remote.getGlobal('BROWSER_VIEW')[winId];
      if (browserView) {
        browserView.setBounds({ 
          x: 2, y: 2, 
          height: 30,
          width: toggle ? 150 : 30
        });
      }
    }
  });

  ipcMain.on('close-devtools', (event, arg) => {
    if (isCurrentWin(arg)) {
      const otherWin = getOtherWin();
      otherWin.webContents.closeDevTools();
    }
  });

  ipcMain.on('open-devtools', (event, arg) => {
    if (isCurrentWin(arg)) {
      const otherWin = getOtherWin();
      otherWin.webContents.openDevTools({
        mode: 'right'
      });
    }
  });

  ipcMain.on('render-reload-contacts-opendevtools', (event) => {
    const contactWin = getContactWin();
    contactWin.webContents.openDevTools();
  });
  ipcMain.on('render-reload-contacts-hide', (event) => {
    const contactWin = getContactWin();
    contactWin.hide();
  });
}
listenNavition();

const devicereadyEvent = new Event('deviceready');
document.addEventListener('DOMContentLoaded', function () {
  // 触发 deviceready 事件
  document.dispatchEvent(devicereadyEvent);

  // 重写 document.addEventListener
  const oldEventListener = document.addEventListener;
  document.addEventListener = function (type, listener, options) {
    if (type === 'deviceready') {
      return listener && listener();
    }
    oldEventListener(type, listener, options);
  };
}, false);

window.cordova = {
  async exec(success, error, WorkPlusType, methodType, otherArgs) {
    switch (methodType) {
      case 'getUserTicket': {
        const data = await Cordova.getUserTicket();
        success(data);
        break;
      }
      case 'getCurrentUserInfo': {
        const data = await Cordova.getCurrentUserInfo();
        success(data);
        break;
      }
      case 'getLoginUserInfo': {
        const data = await Cordova.getCurrentUserInfo();
        success(data);
        break;
      }
      case 'getCurrentEmployeeInfo': {
        const data = await Cordova.getCurrentEmployeeInfo();
        success(data);
        break;
      }
      case 'getContact':
        await Cordova.getContact(success);
        break;
      case 'selectContacts':
      case 'getEmployeesFromCurrentOrg':
      case 'getContacts': {
        await Cordova.getContacts(success);
        break;
      }
      case 'getWifiInfo': {
        Cordova.getWifiInfo((data) => {
          success(data)
        }, (err) => {
          error(err);
        });
        break;
      }

      case 'getIpAddress': {
        const result = await Cordova.getIpAddress();
        success(result);
        break;
      }
      case 'getLocation': {
        // const result = await Cordova.getLocation();
        success('暂不支持定位地址');
        break;
      }
      case 'getDeviceInfo': {
        Cordova.getDeviceInfo((data) => {
          success(data);
        });
        break;
      }
      case 'getAppInfo': {
        const result = await Cordova.getAppInfo();
        success(result);
        break;
      }
      case 'selectImage': {
        await Cordova.selectImage(success);
        break;
      }
      case 'showImages': {
        Cordova.showImages();
        break;
      }
      case 'copyText': {
        Cordova.copyText(otherArgs, clipboard);
        break;
      }
      default: {
        success('该接口暂不支持');
      }
    }
  }
}