import { Helper } from '../app/services/helper/helper.service';
import { ApiResponse } from '../app/services/api-response/api-response.service';
import { Rabbit } from '../app/services/rabbit/rabbit.service';
import { Mongo } from '../app/services/mongo/mongo.service';

import { Publish } from '../app/v1/core/publish/publish.component';
import { QueueLogs } from '../app/v1/core/queue-logs/queue-logs.component';

export function setup(app, config, rabbitMq, mongoModels) {
    const response = new ApiResponse(), helper = new Helper(config), rabbit = new Rabbit(config), mongo = new Mongo(config);

    app.version('v1/core', appCore => {
        appCore.use((req, res, next) => {
            res.startTime = new Date().getTime();

            if (typeof(req.authentication) === 'undefined' || helper.isEmpty(req.authentication.id)) {
                return response.failed(res, 'token', '', 401);
            }

            req.rabbitMq = rabbitMq;
            req.mongoModels = mongoModels;

            if (!req.mongoModels) {
                return response.failed(res, 'model', '', 500);
            }

            next();
        });

        new Publish(appCore, response, helper, rabbit, mongo);
        new QueueLogs(appCore, response, helper, mongo);
    });

    return app;
}
