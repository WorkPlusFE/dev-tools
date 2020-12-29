import { remote } from 'electron'
const{ ipcMain } = remote;
import _ from 'lodash';

const Cordova = require('./cordova').default
export const getRole = () => {
    const key = 'role'+remote.getCurrentWindow().id
    const role = remote.getGlobal('shareRole')[key];
    return role;
}
export const getMainWin = () => {
    return  remote.getGlobal('shareRole')['mainwin'];
}
export const openContact = (type) => {
    const mainwin = getMainWin();
    mainwin.webContents.send('open-select-contact', remote.getCurrentWindow().id,type);
}
console.log('注入成功');
window.cordova = {
   async exec(success,error,WorkPlusType,methodType,otherArgs){
        switch(methodType){
            case 'getUserTicket':{
                const data = await Cordova.getUserTicket();
                console.log({data});
                success(data);
                break;
            }
            case 'getContact':
                const mainwin = getMainWin();
                mainwin.webContents.send('open-select-contact', remote.getCurrentWindow().id,'contact');
                ipcMain.on('render-reload',(event,arg) => {
                    success(arg);
                })
                break;
            case 'getContacts':{
                openContact('contacts');
                ipcMain.on('render-reload-getContacts',(event,arg) => {
                    success(arg);
                })
                break;
            }
            default:
        }
    }
}
