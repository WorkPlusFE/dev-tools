import { getRole, getMainWin, openContact } from './preload.js';
const CordovaRequest = require('./server/CordovaRequest').default
export default class Cordova {
    static async getUserTicket() {
        const role = getRole();
        const {
 api, domain, orgId, user, pwd
} = role;
        const TokenObject = await CordovaRequest.getToken(role);
        const token = _.get(TokenObject, 'access_token', '');
        const TickObject = await CordovaRequest.getUserTicket(token, api, orgId);
        const user_ticket = _.get(TickObject, `ticket_id`);
        return {
            result: {
                user_ticket
            }
        }
}
}
