import { Helper } from '../helper/helper.service';


export class Rabbit {
    helper: Helper;

    constructor(private config) {
        this.helper = new Helper(this.config);
    }

    publish(mq, token: string = '', type: string = '', data: Object = {}) {
        type = this.helper.isNotEmpty(type) ? type : this.config.logQueueName;

        data['createdAt'] = new Date();
        data['updatedAt'] = new Date();

        return mq
            .then(
                (channel) => {
                    let finalAssertData: object = {};

                    return channel.assertQueue(type, { durable: true })
                        .then(
                            (channelAssert) => {
                                finalAssertData = channelAssert || {};
                                return channel.sendToQueue(type, Buffer.from(JSON.stringify(data)), {
                                    persistent: true,
                                    headers: {
                                        'token': token,
                                        [this.config.secretKey]: this.config.secretKeyHash
                                    }
                                });
                            }
                        )
                        .then(
                            (channelStatus) => {
                                // if (channelStatus) {
                                //     channel.close();
                                // }

                                return {...finalAssertData, 'send': channelStatus, ...data};
                            }
                        );
                }
            )
            .catch(
                (error) => error
            );
    }
}
