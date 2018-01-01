/*
 * @Author			jssoscar
 * @Date			2017-12-31 22:35:16 
 * @Version			1.0 
 * @Description	
 */

import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { notification } from 'antd';
import {
    Promise
} from 'es6-promise';

window.Promise = Promise;

axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";

axios.interceptors.request.use(function (config) {
    NProgress.start(); 
    return Object.assign({
        timeout: 100
    }, config);
}, function (error) {
    NProgress.done();
    console.log('request', error)
    return Promise.reject(error);
});

axios.interceptors.response.use(function (res) {
    NProgress.done();
    const {
        data
    } = res;

    if (data && data.errno && data.errno !== 0) {
        notification.error({
            message: '响应异常',
            description: data.errmsg || '未知异常',
            duration : 3
        });
        return Promise.reject(res);
    }
    return res;
}, function (error) {
    if (error.cancel !== true) {
        NProgress.done();
    }
    console.log('response', error)
    notification.error({
        message: `${error.config.url}：请求发生错误`,
        description: `${error.message}\n ${error.stack} `
    });
    return Promise.reject(error);
});

export function get(url, params = {}, options = {}) {
    return axios.get(url, {
        params,
        ...options
    }).then(res => res.data);
}

export function post(url, data = {}, options = {}) {
    return axios.post(url, data, options).then(res => res.data);
}