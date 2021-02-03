import * as mongoConfig from './mongo-config.json';
import * as rabbitConfig from './rabbit-config.json';
import * as apiConfig from './api-config.json';

export const baseConfig = {
  'name': 'queue publisher',
  'hash': 'JNKwaLPDhWKapGe8BN2CashwrZP4AySJpXEvHLxsmyTJmMekMWe4UWGuC3PL',

  'logQueueName': 'logJobs',

  'secretKey': 'x-coupon-key',
  'secretKeyHash': 'KuQmvnxXEjR7KXwfucgerTf6YwZV5Amz5awwxf5PFgkpGrb3Jn',

  'mongo': mongoConfig,
  'rabbit': rabbitConfig,
  'api': apiConfig
};
