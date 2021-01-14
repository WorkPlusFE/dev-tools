import { remote } from 'electron'
import _ from 'lodash';
const { ipcMain } = remote;

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
    mainwin.webContents.send('open-select-contact', remote.getCurrentWindow().id, type);
}
console.log('注入成功');
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
            case 'getCurrentEmployeeInfo': {
                const data = await Cordova.getCurrentEmployeeInfo();
                break;
            }
            case 'getContact':
                const contactWin = getContactWin();
                contactWin.show();
                contactWin.webContents.send('open-select-contact', remote.getCurrentWindow().id, 'contact');
                ipcMain.on('render-reload', (event, arg) => {
                    success(arg);
                })
                break;
            case 'getContacts': {
                openContact('contacts');
                ipcMain.on('render-reload-getContacts', (event, arg) => {
                    success(arg);
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
            }
            default:
        }
    }
}
