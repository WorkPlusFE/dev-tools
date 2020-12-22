import { remote} from 'electron'
const { intersection } = require("lodash");
const CordovaRequest = require('./server/CordovaRequest').default
window.w6s = 'ydky'
const getRole = () => {
    const key = 'role'+remote.getCurrentWindow().id
    const role = remote.getGlobal('shareRole')[key];
    return role;
}
window.cordova = {
   async exec(success,error,WorkPlus_Auth,type,otherArgs){
        switch(type){
            case 'getUserTicket':
                const role = getRole();
                const { api, domain, orgId ,user,pwd} = role;
                const TokenObject = await CordovaRequest.getToken(role);
                const token = _.get(TokenObject,'access_token','');
                const TickObject = await CordovaRequest.getUserTicket(token,api,orgId);
                const user_ticket = _.get(TickObject,`ticket_id`);
                return {user_ticket}
                break;
            case '':
                break;
            default:
        }
    }
}
