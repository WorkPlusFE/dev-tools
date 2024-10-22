const request = require('request');

export default class Request {
    /** get */
    async requestForGet(url) {
        return new Promise((resolove) => {
            const options = {
                url,
                timeout: 15000,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'User-Agent': 'Request',
                    'X-platform': 'Node'
                },
                method: 'GET'
            };
            request(options, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }
                resolove(this.status200Response(JSON.parse(body)));
            });
        })
    }
    /** post */
    async requestForPost(url, data) {
        return new Promise((resolove) => {
            const options = {
                url,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'User-Agent': 'Request',
                    'X-platform': 'Node'
                },
                json: true,
                body: data,
                method: 'POST'
            };
            request(options, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }
                resolove(this.status200Response(body));
            });
        })
    }
    status200Response(value) {
        const response = {
            status: value.status,
            data: value,
            statusText: value.message
        };
        return response;
    }
}
