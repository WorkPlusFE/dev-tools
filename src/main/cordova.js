import { ok } from 'assert';
import { getRole, getMainWin, openContact } from './preload.js';
const CordovaRequest = require('./server/CordovaRequest').default
const wifi = require('node-wifi');
const os = require('os');
const ip = require('ip');
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

    static async getWifiInfo(callback, errorback) {
        wifi.init({
            iface: null
        });
        wifi.getCurrentConnections((error, currentConnections) => {
        if (error) {
            errorback(error);
        } else {
            callback({
                result: _.get(currentConnections, [0], {})
            });
        }
        });
    }

    static async getIpAddress() {
        function getIpAddress() {
            const ifaces = os.networkInterfaces()

            for (const dev in ifaces) {
              const iface = ifaces[dev]
            //  console.log(iface);
              for (let i = 0; i < iface.length; i++) {
                const { family, address, internal } = iface[i]

                if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                //   console.log(family,address,internal)
                  return address
                }
              }
            }
        }
        const ip = getIpAddress();
        console.log(ip)
        return {
            result:'Ok',
            ipAddress:ip
        }
    }
}
