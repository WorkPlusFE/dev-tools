
import _ from 'lodash';
import BaseRequest from '@/server/BaseRequest.js';
import { v4 as uuidv4 } from 'uuid';
export default class DetailRequest {
  static baseRequest = new BaseRequest();
  /**
   * 登录获取token
   */
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
      const api = obj.api + '/token';
      DetailRequest.baseRequest.requestForPost(api, param).then(data => {
        relove(data);
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
    return DetailRequest.baseRequest.requestForGet(url).then(data => {
      const results = _.get(data, `data.result`, []);
      return results
    })
  }
}
