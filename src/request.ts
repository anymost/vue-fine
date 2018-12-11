import axios, { AxiosInstance } from 'axios';
import { AjaxResponse, RequestConfig, RequestInstance } from '.';
import { generateUnionId } from './util';


export default (config: RequestConfig): RequestInstance => {
    const {
        host,
        prefix = '',
        timeout = 100000,
        handleLogin
    } = config;
    const apiDomain = `${host}${prefix}`;
    const instance = axios.create({
        baseURL: apiDomain,
        timeout: timeout,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        responseType: 'json',
        transformResponse: [(data) => {
            // 对 data 进行任意转换处理
            if (!data) {
                return data;
            }
            if (data.status === 401) {
                handleLogin();
            }
            return data;
        }],
    });
    return {
        GET: _get(instance),
        POST: _post(instance),
        DELETE: _delete(instance),
        PATCH: _patch(instance),
        PUT: _put(instance)
    };
};



export const _get = (instance: AxiosInstance) => (url: string, param?: any) => {
    const params: any[] = [];
    url = `${url}?traceId=${generateUnionId()}`;
    if (param) {
        Object.keys(param).forEach((key: any) => {
            params.push(`${key}=${encodeURIComponent(param[key])}`);
        });
        url = url + '&' + params.join('&');
    }
    return instance.get<AjaxResponse>(url);
};

const _post = (instance: AxiosInstance) => (url: string, param?: any) => {
    return instance.post<AjaxResponse>(`${url}?traceId=${generateUnionId()}`, param);
};

const _put = (instance: AxiosInstance) => (url: string, param?: any) => {
    return instance.put<AjaxResponse>(`${url}?traceId=${generateUnionId()}`, param);
};

const _delete = (instance: AxiosInstance) => (url: string, param?: any) => {
    return instance.delete(`${url}?traceId=${generateUnionId()}`, param);
};

const _patch = (instance: AxiosInstance) => (url: string, param?: any) => {
    return instance.patch<AjaxResponse>(`${url}?traceId=${generateUnionId()}`, param);
};


