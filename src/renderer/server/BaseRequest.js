/* eslint-disable class-methods-use-this */
import axios from 'axios';
export default class BaseRequest {
    static DEFAULT_TIMEOUT = 30 * 1000;
    /* 创建axios实例 */
    request = axios.create({
        responseType: 'json',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
        },
    });

    getDefaultHeaders() {
        const headers = {
            "X-WP-LANG": "zh_CN"
        };
        return headers;
    }

    /**
     * GET请求
     * @param url
     */
    async requestForGet(url) {
        return new Promise((resolove) => {
            const res = this.request.get(url, {
                timeout: BaseRequest.DEFAULT_TIMEOUT,
                headers: this.getDefaultHeaders()
            });
            res.then((value) => {
                resolove(this.status200Response(value));
            }).catch((err) => {
                resolove(this.errorResponse(err));
            });
        });
    }
    /**
     * POST 请求
     * @param url POST URL
     * @param data
     */
    async requestForPost(url, data) {
        return new Promise((resolove) => {
            const res = this.request.post(url, data, {
                timeout: BaseRequest.DEFAULT_TIMEOUT,
                headers: this.getDefaultHeaders()
            });
            res.then((value) => {
                resolove(this.status200Response(value));
            }).catch((err) => {
                resolove(this.errorResponse(err));
            });
        });
    }

    status200Response(value) {
        const response = {
            status: value.status,
            data: value.data,
            statusText: value.statusText
        };
        return response;
    }
    
    errorResponse(err) {
        const response = {
            status: -1,
            error: err
        };
        return response;
    }
}
