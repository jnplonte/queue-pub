import { Request, Response } from 'express';
import { CoreMiddleware } from '../../../middlewares/core/core.middleware';


export class Token extends CoreMiddleware {
    constructor(app, private response, private helper) {
        super(app);
    }

    get services() {
        return {
            'POST /token': 'tokenLogin'
        };
    }

    /**
     * @api {post} /auth/token generate token
     * @apiVersion 1.0.0
     * @apiName tokenLogin
     * @apiGroup AUTHENTICATION
     * @apiPermission all
     *
     * @apiDescription generate JWT token to authenticate (temporary authentication)
     *
     * @apiParam (body) {String} id token identifier
     * @apiParam (body) {String} name token name
     */
    tokenLogin(req: Request, res: Response): void {
        const reqParameters: string[] = ['id', 'name'];
        if (!this.helper.validateData(req.body, reqParameters)) {
            return this.response.failed(res, 'data', reqParameters);
        }

        const data = req.body;

        const finalData: object = {
            'id': data.id || '',
            'name': data.name || ''
        };

        return this.response.success(res, 'token', this.helper.createJwtToken({...finalData, 'permissionLevel': 1}));
    }
}
