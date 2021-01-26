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
const {
  contactWinShow,
  contactWinHide
} = require('./ContactWindow')
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

const listenNavition = () => {
  ipcMain.on('route-back', (event, arg) => {
    window.history.go(-1)
  })
  ipcMain.on('close-devtools', (event, arg) => {
    const otherWin = getOtherWin();
    otherWin.webContents.closeDevTools();
  })
  ipcMain.on('open-devtools', (event, arg) => {
    const otherWin = getOtherWin();
    otherWin.webContents.openDevTools({
      mode: 'right'
    });
  })
};
listenNavition();

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
        success('暂时不支持定位地址');
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
        success('暂时不支持该查询');
      }
    }
  }
}