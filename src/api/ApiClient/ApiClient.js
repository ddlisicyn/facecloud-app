import _ from 'lodash';
import { deleteUserData } from '../services/sessionService';

const defaultOptions = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
};

export default class ApiClient {
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.options = defaultOptions;
    }

    async request(url, reqOptions = {}, responseType = 'json') {
        const { body, ...restOptions } = reqOptions;
        const urlWithParams = new URL(`${this.baseUrl}${url}`);
        const mergedOptions = _.merge(_.cloneDeep(this.options), restOptions);

        try {
            const response = await fetch(urlWithParams.toString(), {
            ...mergedOptions,
            body
        });

        if (response.ok) {
            switch (responseType) {
                case 'text':
                    return response.text();
                case 'blob':
                    return response.blob();
                case 'json':
                    return response.json();
                default:
                    return response;
            }
        }

        if (response.status >= 400) {
            switch (response.status) {
                case 400: {
                    return this.errorMessageHandler(response);
                }
                case 401:
                case 403: {
                    deleteUserData();
                    break;
                }
                default:
                    break;
            }
        }

        return this.errorMessageHandler(response);
        } catch (error) {
        return this.defaultErrorHandler(error);
        }
    }

    async get(url, reqOptions, responseType) {
        return this.request(url, reqOptions, responseType);
    }

    async post(url, body, reqOptions, responseType) {
        return this.request(url, {
            ...reqOptions,
            method: 'POST',
            body: JSON.stringify(body)
        }, responseType);
    }

    async upload(url, body, reqOptions = {}) {
        return this.request(url, {
            ...reqOptions,
            method: 'POST',
            body
        });
    }

    async put(url, body, reqOptions) {
        return this.request(url, {
            ...reqOptions,
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }

    async delete(url, reqOptions) {
        return this.request(url, {
            ...reqOptions,
            method: 'DELETE'
        });
    }

    // eslint-disable-next-line class-methods-use-this
    authErrorHandler() {
        return Promise.reject(new Error('Auth failed'));
    }

    // eslint-disable-next-line class-methods-use-this
    async errorMessageHandler(errorResponse) {
        console.log('Api client: request errorCode', errorResponse);
        let msg = '';
        const responseText = await errorResponse.text();
        try {
            msg = JSON.parse(responseText);
            if (msg.message) {
                console.log(msg.message);
            }
        } catch (e) {
            console.info('Couldn\'t parse error response JSON: ', e);
            msg = responseText;
        }
        return Promise.reject(msg);
    }

    defaultErrorHandler(error) {
        console.log('Api client: request errorCode', error);
        return Promise.reject(error);
    }
}
