import { AxiosPromise } from "axios";

export type RequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';


export interface AjaxResponse {
    code: number;
    message: string;
    data: any;
}

export interface RequestConfig {
    host: string;
    prefix?: string;
    timeout?: number;
    handleLogin: Function
}

export interface RequestInstance {
    GET: (url: string, param?: string) => AxiosPromise<AjaxResponse>;
    POST: (url: string, param?: string) => AxiosPromise<AjaxResponse>;
    DELETE: (url: string, param?: string) => AxiosPromise<AjaxResponse>;
    PUT: (url: string, param?: string) => AxiosPromise<AjaxResponse>;
    PATCH: (url: string, param?: string) => AxiosPromise<AjaxResponse>;
}

export class Fine {
    constructor(config: RequestConfig, resCode: number, showMessage: Function);
    $api: RequestInstance;
    $resCode: number;
    $showMessage: Function;
    $request: (method: RequestType, path: string, payload?: any) => Promise<any>
}

