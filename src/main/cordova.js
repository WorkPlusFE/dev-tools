import { getRole, getMainWin, openContact } from './preload.js';
const CordovaRequest = require('./server/CordovaRequest').default
export default class Cordova {
    /** 获取角色信息和token */
    static async preInfo() {
        const role = getRole();
        const TokenObject = await CordovaRequest.getToken(role);
        const token = _.get(TokenObject, 'access_token', '');
        return {
            role,
            token
        }
    }
    /** 获取ticket */
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
    /** 获取用户登录信息 */
    static async getCurrentUserInfo() {
        const preInfo = await Cordova.preInfo();
        const {
 api, domain, orgId, user, pwd
} = preInfo.role;
        const userInfo = await CordovaRequest.getCurrentUserInfo(preInfo.token, api, user);
        return {
            result: {
                userInfo
            }
        }
    }
    /** 获取雇员信息 */
    static async getCurrentEmployeeInfo() {
        const preInfo = await Cordova.preInfo();
        const {
 api, domain, orgId, user, pwd
} = preInfo.role;
        const employeeInfo = await CordovaRequest.getCurrentEmployeeInfo(preInfo.token, api, user, orgId);
        return {
            result: {
                employeeInfo
            }
        }
    }
}
