import { Request, Response } from 'express';
import { CoreMiddleware } from '../../../middlewares/core/core.middleware';

import { QueueLogsAttributes } from '../../../../models/queue-logs';

export class QueueLogs extends CoreMiddleware {
    constructor(app, private response, private helper, private mongo) {
        super(app);
    }

    get services() {
        return {'GET /queuelogs': 'all',
                'GET /queuelogs/:id': 'get',
                'POST /queuelogs': 'post',
                'PUT /queuelogs/:id' : 'put',
                'DELETE /queuelogs/:id' : 'delete'};
    }

    /**
     * @api {get} /core/queuelogs get queue logs
     * @apiVersion 1.0.0
     * @apiName all
     * @apiGroup QUEUELOGS
     * @apiPermission authenticated-user
     *
     * @apiDescription get all queue logs
     *
     * @apiParam (url parameter) {Number} [limit=10] data limit <br/>Ex. ?limit=1
     */
    all(req: Request, res: Response): void {
        const whereData = {
            'userId': req.authentication.id || null,
        };

        return this.mongo.getAllField(req.mongoModels.queueLogs, whereData, '', req.query.limit || 10)
            .then(
                (queue: QueueLogsAttributes) => this.response.success(res, 'get', queue)
            )
            .catch(
                (error) => this.response.failed(res, 'get', error)
            );
    }

    /**
     * @api {get} /core/queuelogs/:id get queue logs
     * @apiVersion 1.0.0
     * @apiName get
     * @apiGroup QUEUELOGS
     * @apiPermission authenticated-user
     *
     * @apiDescription get one queue logs
     *
     * @apiParam (url segment) {String} id queue id
     */
    get(req: Request, res: Response): void {
        const whereData = {
            'userId': req.authentication.id || null,
            '_id': req.params.id || null
        };

        return this.mongo.getOne(req.mongoModels.queueLogs, whereData)
            .then(
                (queue: QueueLogsAttributes) => this.response.success(res, 'get', queue || {})
            )
            .catch(
                (error) => this.response.failed(res, 'get', error)
            );
    }

    /**
     * @api {post} /core/queuelogs insert queue logs
     * @apiVersion 1.0.0
     * @apiName post
     * @apiGroup QUEUELOGS
     * @apiPermission authenticated-user
     *
     * @apiDescription insert queue logs
     *
     * @apiParam (body) {String} message message
     * @apiParam (body) {Object} data data
     * @apiParam (body) {Object} [additionalData] additional data
     */
    post(req: Request, res: Response): void {
        const reqParameters = ['message', 'data'];
        if (!this.helper.validateData(req.body, reqParameters)) {
            return this.response.failed(res, 'data', reqParameters);
        }

        const data = req.body;
        data['userId'] = req.authentication.id || null;
        data['userName'] = req.authentication.name || null;

        return this.mongo.post(req.mongoModels.queueLogs, data)
            .then(
                (queue: QueueLogsAttributes) => {
                    if (!queue['_id']) {
                        return Promise.reject('error logs');
                    }

                    return this.response.success(res, 'post', queue);
                }
            )
            .catch(
                (error) => this.response.failed(res, 'post', error)
            );
    }

    /**
     * @api {put} /core/queuelogs/:id update queue logs
     * @apiVersion 1.0.0
     * @apiName put
     * @apiGroup QUEUELOGS
     * @apiPermission authenticated-user
     *
     * @apiDescription update queue logs
     *
     * @apiParam (url segment) {String} id queue id
     * @apiParam (body) {String} [message] message
     * @apiParam (body) {Object} [data] data
     * @apiParam (body) {Object} [additionalData] additional data
     */
    put(req: Request, res: Response): void {
        const whereData = {
            'userId': req.authentication.id || null,
            '_id': req.params.id || null
        };

        const data = req.body;

        return this.mongo.update(req.mongoModels.queueLogs, whereData, data)
            .then(
                (queue: QueueLogsAttributes) => this.response.success(res, 'put', queue || {})
            )
            .catch(
                (error) => this.response.failed(res, 'put', error)
            );
    }

    /**
     * @api {delete} /core/queuelogs/:id delete queue logs
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup QUEUELOGS
     * @apiPermission authenticated-user
     *
     * @apiDescription delete queue logs
     *
     * @apiParam (url segment) {Number} id queue id
     */
    delete(req: Request, res: Response): void {
        const whereData = {
            'userId': req.authentication.id || null,
            '_id': req.params.id || null
        };

        return this.mongo.delete(req.mongoModels.queueLogs, whereData)
            .then(
                (queue: QueueLogsAttributes) => this.response.success(res, 'delete', queue || {})
            )
            .catch(
                (error) => this.response.failed(res, 'delete', error)
            );
    }
}
