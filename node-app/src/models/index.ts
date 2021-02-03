import * as mongoose from 'mongoose';

import { baseConfig } from './../config';

import { queueLogsModel } from './queue-logs';

const databaseInstance: Array<any> = [];

export function mongoSetup() {
    if (databaseInstance['mongo']) {
        return databaseInstance['mongo'];
    }

    const env = process.env.NODE_ENV || 'local';
    const config = baseConfig.mongo[env];

    if (env !== 'production') {
        mongoose.set('debug', true);
    }

    if (mongoose.connection.readyState === 0) {
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        mongoose.connect(`mongodb://${config['username']}:${config['password']}@${config['host']}:${config['port']}/${config['database']}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.connection.on('connected', (err) => {
            if (err) {
                console.error('mongo connection error:', err);
            } else {
                console.log('mongo connection success');
            }
        });
        mongoose.connection.on('error', console.error.bind(console, 'mongo connection error:'));
    }

    const db = {
        queueLogs: queueLogsModel(mongoose)
    };

    databaseInstance['mongo'] = db;
    return db;
}
