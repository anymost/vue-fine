import createRequest from './request';
import { RequestConfig, RequestInstance, RequestType } from '.';

export class Fine {
    constructor(config: RequestConfig, resCode: number, showMessage: Function) {
        this.$api = createRequest(config);
        this.$resCode = resCode;
        this.$showMessage = showMessage;
    }

    protected readonly $api: RequestInstance;
    protected readonly $resCode: number;
    protected readonly $showMessage: Function;


    protected async $request(method: RequestType, path: string, payload?: any) {
        try {
            const value = await this.$api[method](path, payload);
            if (value.data.code === this.$resCode) {
                return value;
            } else {
                this.$showMessage(value.data.message);
            }
        } catch (e) {
            this.$showMessage(e);
        }
        return null;
    }
}

