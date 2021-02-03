import { Request, Response } from 'express';
import { CoreMiddleware } from '../../../middlewares/core/core.middleware';

import { QueueLogsAttributes } from '../../../../models/queue-logs';


export class Publish extends CoreMiddleware {
    constructor(app, private response, private helper, private rabbit, private mongo) {
        super(app);
    }

    get services() {
        return {'POST /publish': 'post'};
    }

    /**
     * @api {post} /core/publish publish
     * @apiVersion 1.0.0
     * @apiName post
     * @apiGroup PUBLISH
     * @apiPermission authenticated-user
     *
     * @apiDescription publish data
     *
     * @apiParam (body) {String} type type <br/>Ex. [logJobs, recieveJobs, confirmJobs]
     * @apiParam (body) {String} action publishing action <br/>Ex. [submit, recieved, pending, completed]
     * @apiParam (body) {Object} data publishing data
     * @apiParam (body) {String} [message] publishing message
     */
    post(req: Request, res: Response): void {
        const reqParameters = ['type', 'action', 'data'];
        if (!this.helper.validateData(req.body, reqParameters)) {
            return this.response.failed(res, 'data', reqParameters);
        }

        const data = req.body;
        data['message'] = data['message'] || '';

        data['id'] = req.authentication.id || null;
        data['name'] = req.authentication.name || null;

        let logsId: string = '';
        let logsData: object = {};

        const queuePostData: QueueLogsAttributes = {
            'userId': data['id'],
            'userName': data['name'],
            'message': 'publish queue',
            'data': data,
            'additionalData': {
                'isRead': false,
                'isSubmitted': false,
                'isReceived': false,
                'receivedBy': '',
                'receivedAt': ''
            }
        };
        return this.mongo.post(req.mongoModels.queueLogs, queuePostData)
            .then(
                (queue: QueueLogsAttributes) => {
                    if (!queue['_id']) {
                        return Promise.reject('error logs');
                    }

                    logsId = (queue['_id']).toString();
                    return this.rabbit.publish(req.rabbitMq, data['type'], data);
                }
            )
            .then(
                (rabbitData) => {
                    if (this.helper.isEmptyObject(rabbitData) || this.helper.isEmpty(logsId)) {
                        return Promise.reject('error publish');
                    }

                    const queueUpdateData = {
                        'additionalData.isRead': false,
                        'additionalData.isSubmitted': true
                    };

                    logsData = rabbitData || {};
                    return this.mongo.update(req.mongoModels.queueLogs, {'_id': logsId}, queueUpdateData);
                }
            )
            .then(
                (queue: QueueLogsAttributes) => {
                    return this.response.success(res, 'publish', logsData);
                }
            )
            .catch(
                (error) => this.response.failed(res, 'publish', error)
            );
    }
}
