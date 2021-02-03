import { Helper } from '../app/services/helper/helper.service';
import { ApiResponse } from '../app/services/api-response/api-response.service';


import { Token } from '../app/v1/authentication/token/token.component';

export function setup(app, config) {
    const response = new ApiResponse(), helper = new Helper(config);

    app.version('v1/auth', appAuth => {
        appAuth.use((req, res, next) => {
            res.startTime = new Date().getTime();

            if (helper.isEmpty(req.headers[config.secretKey]) || req.headers[config.secretKey] !== config.secretKeyHash) {
                return response.failed(res, 'token', '', 401);
            }

            next();
        });

        new Token(appAuth, response, helper);
    });

    return app;
}
