import * as amqp from 'amqplib';

import { baseConfig } from './../config';

const databaseInstance: Array<any> = [];

export async function rabbitSetup() {
    if (databaseInstance['rabbit']) {
        return databaseInstance['rabbit'];
    }

    try {
        const env = process.env.NODE_ENV || 'local';
        const rabbitConfig = baseConfig.rabbit[env];

        const connection = await amqp.connect(`${rabbitConfig.host}:${rabbitConfig.port}`);
        const rmq = await connection.createChannel();

        databaseInstance['rabbit'] = rmq;

        console.log('rabbit connection success');
        return rmq;
    } catch (err) {
        console.error('rabbit connection error:', err);
        return null;
    }
}
