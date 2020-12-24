import { remote } from 'electron'
const{ ipcMain } = remote;
import _ from 'lodash';
const CordovaRequest = require('./server/CordovaRequest').default
const getRole = () => {
    const key = 'role'+remote.getCurrentWindow().id
    const role = remote.getGlobal('shareRole')[key];
    return role;
}
const getMainWin = () => {
    return  remote.getGlobal('shareRole')['mainwin'];
}
console.log('注入成功');
window.cordova = {
   async exec(success,error,WorkPlusType,methodType,otherArgs){
        switch(methodType){
            case 'getUserTicket':
                const role = getRole();
                const { api, domain, orgId ,user,pwd} = role;
                const TokenObject = await CordovaRequest.getToken(role);
                const token = _.get(TokenObject,'access_token','');
                const TickObject = await CordovaRequest.getUserTicket(token,api,orgId);
                const user_ticket = _.get(TickObject,`ticket_id`);
                return {user_ticket}
                break;
            case 'getContact':
                const mainwin = getMainWin();
                mainwin.webContents.send('open-select-contact', remote.getCurrentWindow().id);
                ipcMain.on('render-reload',(event,arg) => {
                    console.log(arg);
                    alert(arg);
                })
                break;
            default:
        }
    }
}
