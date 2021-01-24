import { remote } from 'electron'
import _ from 'lodash';
const { ipcMain, dialog } = remote;

const Cordova = require('./cordova').default
const { contactWinShow, contactWinHide } = require('./ContactWindow')
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
console.log('注入成功');
const listenNavition = () => {
    console.log('监听事件');
    ipcMain.on('route-back', (event, arg) => {
        console.log('监听事件 route-back');
        window.history.go(-1)
    })
    ipcMain.on('close-devtools', (event, arg) => {
        console.log('监听事件 close-devtools');
        const otherWin = getOtherWin();
        otherWin.webContents.closeDevTools();
    })
    ipcMain.on('open-devtools', (event, arg) => {
        console.log('监听事件 open-devtools');
        const otherWin = getOtherWin();
        otherWin.webContents.openDevTools();
    })
}
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
                const contactWin = getContactWin();
                contactWin.show();
                contactWin.webContents.closeDevTools();
                contactWin.webContents.send('open-select-contact', remote.getCurrentWindow().id, 'contact');
                ipcMain.on('render-reload', (event, arg) => {
                    success(arg);
                    contactWin.hide();
                })
                break;
            case 'selectContacts':
            case 'getEmployeesFromCurrentOrg':
            case 'getContacts': {
                const contactWin = getContactWin();
                contactWin.show();
                contactWin.webContents.closeDevTools();
                contactWin.webContents.send('open-select-contact', remote.getCurrentWindow().id, 'contacts');
                ipcMain.on('render-reload-getContacts', (event, arg) => {
                    success(arg);
                    contactWin.hide();
                })
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
                dialog.showOpenDialog({ properties: ['openFile'] }, { filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] },] })
                  .then(result => {
                    console.log(result);
                    success({ path: _.get(result, `filePaths[0]`, '') })
                })
                break;
            }
            case 'showImages': {
                dialog.showOpenDialog({ properties: ['multiSelections'] }, { filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] },] })
                .then(result => {
                  console.log(result);
                  const imageShowWin = getImageShowWin();
                  imageShowWin.show();
                  imageShowWin.webContents.openDevTools();
                  imageShowWin.webContents.send('image-show', _.get(result, `filePaths`, ''));
                  ipcMain.on('render-image-show', (event, arg) => {
                    imageShowWin.hide();
                  })
              })
              break;
            }
            default: {
                success('暂时不支持该查询');
            }
        }
    }
}
