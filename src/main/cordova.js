
import { getRole, getMainWin, openContact, getImageShowWin, getContactWin } from './preload.js';
import { remote, clipboard } from 'electron';
import _ from 'lodash';
import { contactWinHide } from './ContactWindow.js';
const CordovaRequest = require('./server/CordovaRequest').default
const wifi = require('node-wifi');
const os = require('os');
const ip = require('ip');
const { ipcMain, dialog } = remote;
const request = require('request');

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

    static async getUserTicket2() {
        const role = getRole();
        const {
            api, domain, orgId, user, pwd
        } = role;
        const TokenObject = await CordovaRequest.getToken(role);
        const token = _.get(TokenObject, 'access_token', '');
        const url = `${api}/organizations?access_token=${token}`;
        const options = {
            url,
            method: 'GET'
        };
        request(options, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(JSON.parse(body));
        });
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

    /** 获取wifi信息 */
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

    /** 获取ip地址 */
    static async getIpAddress() {
        function getIpAddress() {
            const ifaces = os.networkInterfaces()

            for (const dev in ifaces) {
              const iface = ifaces[dev]

              for (let i = 0; i < iface.length; i++) {
                const { family, address, internal } = iface[i]

                if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                  return address
                }
              }
            }
        }
        const ip = getIpAddress();

        return {
            result: 'Ok',
            ipAddress: ip
        }
    }

    /** 获取地理定位 */
    static async getLocation() {
        function getPosition() {
            return new Promise((resolve, reject) => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  const latitude = position.coords.latitude
                  const longitude = position.coords.longitude
                  const data = {
                    latitude,
                    longitude
                  }
                  resolve(data)
                }, (err) => {
                  reject(err)
                })
              } else {
                reject('你的浏览器不支持当前地理位置信息获取')
              }
            })
          }
          getPosition().then(result => {

          })
    }

    /** 获取设备信息 */
    static async getDeviceInfo(callback) {
        const preInfo = await Cordova.preInfo();
        wifi.init({
            iface: null
        });
        wifi.getCurrentConnections((error, currentConnections) => {
        if (error) {
            errorback(error);
        } else {
            const device_id = _.get(currentConnections, `[0].mac`, '');
            const domain_id = preInfo.role.domain;
            callback({
                result: {
                    device_id,
                    platform: 'devtools',
                    domain_id,
                    product_version: '4.9.4',
                    system_version: '10',
                    system_model: 'MI 9',
                    channel_verdor: 'XiaoMi',
                    channel_id: preInfo.role.api,
                    device_name: 'XiaoMi Mi 9',
                    device_system_info: 'devtools'
                }
            });
        }
        });
    }

    /** 获取app信息 */
    static async getAppInfo() {
        return {
            app_icon: '',
            app_name: 'workplus',
            bundle_id: 'com.foreverht.workplus.v4',
            version_code: 2879,
            version_name: '4.9.4'
        }
    }

    /** 复制文本 */
    static copyText(args, clipboard) {
        let text = '';
        _.forEach(args, (item, index) => {
            for (const key in item) {
               if (key == 'text') {
                 text = item[key]
               }
            }
        })
        clipboard.writeText(text);
    }
    /** 图片预览 */
    static showImages() {
        dialog.showOpenDialog({ properties: ['multiSelections'] }, { filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] },] })
            .then(result => {
                const imageShowWin = getImageShowWin();
                imageShowWin.show();
                imageShowWin.webContents.openDevTools();
                imageShowWin.webContents.send('image-show', _.get(result, `filePaths`, ''));
                ipcMain.on('render-image-show', (event, arg) => {
                    imageShowWin.hide();
                })
            })
    }
    /** 选择图片 */
    static async selectImage(success) {
        return new Promise((resolve, reject) => {
            dialog.showOpenDialog({ properties: ['openFile'] }, { filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] },] })
                  .then(result => {
                    success(_.get(result, `filePaths[0]`, ''));
                })
        })
    }

    /** 单选联系人 */
    static async getContact(success) {
        const contactWin = getContactWin();
        contactWin.show();
        contactWin.webContents.send('open-select-contact', remote.getCurrentWindow().id, 'contact');
        ipcMain.on('render-reload', (event, arg) => {
            success(arg);
            contactWin.hide();
        })
    }

    /** 多选联系人 */
    static async getContacts(success) {
        const contactWin = getContactWin();
        contactWin.show();
        contactWin.webContents.send('open-select-contact', remote.getCurrentWindow().id, 'contacts');
        ipcMain.on('render-reload-getContacts', (event, arg) => {
            success(arg);
            contactWin.hide();
        })
    }
}
