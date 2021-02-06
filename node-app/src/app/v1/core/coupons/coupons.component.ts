import { Request, Response } from 'express';
import { CoreMiddleware } from '../../../middlewares/core/core.middleware';

import { CouponsAttributes } from '../../../../models/coupons';

export class Coupons extends CoreMiddleware {
    constructor(app, private response, private helper, private mongo) {
        super(app);
    }

    get services() {
        return {'GET /coupons': 'all',
                'GET /coupons/:id': 'get',
                'POST /coupons': 'post',
                'PUT /coupons/:id' : 'put',
                'DELETE /coupons/:id' : 'delete'};
    }

    /**
     * @api {get} /core/coupons get coupon
     * @apiVersion 1.0.0
     * @apiName all
     * @apiGroup COUPONS
     * @apiPermission authenticated-user
     *
     * @apiDescription get all coupon
     *
     * @apiParam (url parameter) {String} [query] filter query <br/>Ex. ?query=key:value
     * @apiParam (url parameter) {Number} [limit=10] data limit <br/>Ex. ?limit=1
     * @apiParam (url parameter) {Number} [page=1] page number <br/>Ex. ?page=1
     * @apiParam (url parameter) {String} [sortBy=createdAt] sorting key
     * @apiParam (url parameter) {String} [sortAt=DESC] sorting method <br/>Ex. ?sortAt=ASC|DESC
     */
    all(req: Request, res: Response): void {
        const whereData = {};

        return this.mongo.getAll(req.mongoModels.coupons, whereData, req.query)
            .then(
                (coupons: any) => {
                    const {data, pagination} = coupons || {'data': [], 'pagination': {}};

                    return this.response.success(res, 'get', data, pagination);
                }
            )
            .catch(
                (error) => this.response.failed(res, 'get', error)
            );
    }

    /**
     * @api {get} /core/coupons/:id get coupon
     * @apiVersion 1.0.0
     * @apiName get
     * @apiGroup COUPONS
     * @apiPermission authenticated-user
     *
     * @apiDescription get one coupon
     *
     * @apiParam (url segment) {String} id coupon id
     * @apiParam (url parameter) {String} key key search <br/>Ex. ?key=name
     */
    get(req: Request, res: Response): void {
        const whereData = {
            [(req.query.key || '_id') as string]: req.params.id,
        };

        return this.mongo.getOne(req.mongoModels.coupons, whereData)
            .then(
                (coupon: CouponsAttributes) => this.response.success(res, 'get', coupon || {})
            )
            .catch(
                (error) => this.response.failed(res, 'get', error)
            );
    }

    /**
     * @api {post} /core/coupons insert coupon
     * @apiVersion 1.0.0
     * @apiName post
     * @apiGroup COUPONS
     * @apiPermission authenticated-user
     *
     * @apiDescription insert coupon
     *
     * @apiParam (body) {String} name name
     * @apiParam (body) {String} code code
     * @apiParam (body) {String} [description] description
     * @apiParam (body) {String} [termsAndCondition] terms and condition
     * @apiParam (body) {String} [image] image url
     * @apiParam (body) {number} [count] coupon count
     * @apiParam (body) {Date} [validityStartDate] validity start date
     * @apiParam (body) {Number} [validity] validity date number
     * @apiParam (body) {Object} [additionalData] additional data
     */
    post(req: Request, res: Response): void {
        const reqParameters = ['name', 'code'];
        if (!this.helper.validateData(req.body, reqParameters)) {
            return this.response.failed(res, 'data', reqParameters);
        }

        const data = req.body;

        return this.mongo.post(req.mongoModels.coupons, data)
            .then(
                (coupon: CouponsAttributes) => {
                    if (!coupon['_id']) {
                        return Promise.reject('error coupns');
                    }

                    return this.response.success(res, 'post', coupon);
                }
            )
            .catch(
                (error) => this.response.failed(res, 'post', error)
            );
    }

    /**
     * @api {put} /core/coupons/:id update coupon
     * @apiVersion 1.0.0
     * @apiName put
     * @apiGroup COUPONS
     * @apiPermission authenticated-user
     *
     * @apiDescription update coupon
     *
     * @apiParam (url segment) {String} id coupon id
     * @apiParam (body) {String} [name] name
     * @apiParam (body) {String} [code] code
     * @apiParam (body) {String} [description] description
     * @apiParam (body) {String} [termsAndCondition] terms and condition
     * @apiParam (body) {String} [image] image url
     * @apiParam (body) {number} [count] coupon count
     * @apiParam (body) {Date} [validityStartDate] validity start date
     * @apiParam (body) {Number} [validity] validity date number
     * @apiParam (body) {Object} [additionalData] additional data
     */
    put(req: Request, res: Response): void {
        const whereData = {
            '_id': req.params.id || null
        };

        const data = req.body;

        return this.mongo.update(req.mongoModels.coupons, whereData, data)
            .then(
                (coupon: CouponsAttributes) => this.response.success(res, 'put', coupon || {})
            )
            .catch(
                (error) => this.response.failed(res, 'put', error)
            );
    }

    /**
     * @api {delete} /core/coupons/:id delete coupon
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup COUPONS
     * @apiPermission authenticated-user
     *
     * @apiDescription delete coupon
     *
     * @apiParam (url segment) {Number} id coupon id
     */
    delete(req: Request, res: Response): void {
        const whereData = {
            '_id': req.params.id || null
        };

        return this.mongo.delete(req.mongoModels.coupons, whereData)
            .then(
                (coupon: CouponsAttributes) => this.response.success(res, 'delete', coupon || {})
            )
            .catch(
                (error) => this.response.failed(res, 'delete', error)
            );
    }
}
