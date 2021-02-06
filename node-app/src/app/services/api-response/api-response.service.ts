import { Response } from 'express';

export class ApiResponse {
    env: string = process.env.NODE_ENV || 'local';

    constructor() {

    }

    getMessage(method: string = ''): string {
        let message: string = '';

        switch (method) {
            case 'post-success':
                message = 'Insert Success';
            break;

            case 'put-success':
                message = 'Update Success';
            break;

            case 'delete-success':
                message = 'Delete Success';
            break;

            case 'post-failed':
                message = 'Insert Failed';
            break;

            case 'put-failed':
                message = 'Update Failed';
            break;

            case 'delete-failed':
                message = 'Delete Failed';
            break;

            case 'data-failed':
                message = 'Missing Parameters';
            break;

            case 'token-failed':
                message = 'Invalid Authentication Token';
            break;

            case 'model-failed':
                message = 'Internal Server Error';
            break;

            case 'permission-failed':
                message = 'Permission Denied';
            break;

            case 'invalid-status-failed':
                message = 'invalid status';
            break;

            default:
                message = method;
        }
        return message;
    }

    getError(method: string = '', errorList: any = null): string[] {
        const message: string[] = [];

        switch (method) {
            case 'DatabaseError':
                message.push('error.database');
            break;

            case 'NetworkingError':
            case 'ConnectionError':
                message.push('error.network');
            break;

            default:
                message.push(`error.${method}`);
        }

        return message;
    }

    success(res: Response, param: string, data: any = '', pagination: Object = {}, status: number = 200): any {
        const resData = {
            'status': 'success',
            'message': this.getMessage(`${param}-success`),
            'executionTime': (res.startTime) ? ((new Date().getTime()) - res.startTime) / 1000 : 0,
            'data': data
        };

        if (pagination && Object.keys(pagination).length !== 0 && pagination.constructor === Object) {
            resData['pagination'] = pagination || {};
        }

        return (res.status) ? res.status(status || 200).json(resData) : resData;
    }

    failed(res: Response, param: string, data: any = '', error: number = 400): any {
        const errorData: any = (data.name || data.code) ? this.getError(data.name || data.code, data || null) : (typeof(data) === 'string') ? [data.replace(/ /g, '.').toLowerCase()] : data;
        const resData = {
            'status': 'failed',
            'message': this.getMessage(`${param}-failed`),
            'executionTime': (res.startTime) ? ((new Date().getTime()) - res.startTime) / 1000 : 0,
            'data': (errorData.length === 1 && errorData[0] === '') ? [] : errorData
        };
        return (res.status) ? res.status(error || 400).json(resData) : resData;
    }
}
