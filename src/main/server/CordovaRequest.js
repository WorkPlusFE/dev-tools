import _ from 'lodash';
import BaseRequest from './BaseRequest.js';
import { v4 as uuidv4 } from 'uuid';
export default class CordovaRequest {
    static baseRequest = new BaseRequest();

    /** 获取token */
    static getToken(obj) {
        return new Promise((relove, reject) => {
            const param = {
              grant_type: 'password',
              scope: 'user',
              domain_id: obj.domain,
              client_id: obj.user,
              client_secret: obj.pwd,
              client_secret_encrypt: false,
              device_id: uuidv4(),
              device_platform: 'PC'
            };
            const api = `${obj.api}/token`;
            CordovaRequest.baseRequest.requestForPost(api, param).then(data => {
                const results = _.get(data, `data.result`, []);
                relove(results);
            }).catch(err => {
              reject(err);
            })
          })
    }

    /**
   * 获取组织架构
   */
  static getOrganization(token, api) {
    const url = `${api}/organizations?access_token=${token}`;
    return CordovaRequest.baseRequest.requestForGet(url).then(data => {
      const results = _.get(data, `data.result`, []);
      return results;
    })
  }

  /**
   * 获取 ticket
   */
  static getUserTicket(token, api, orgId) {
    const url = `${api}/tickets?access_token=${token}`;
    return CordovaRequest.baseRequest.requestForPost(url, { org_id: orgId }).then(data => {
      const results = _.get(data, `data.result`, []);
      return results;
    })
  }
}
