import { expect } from 'chai';
import { Mongo } from './mongo.service';
import { baseConfig } from './../../../config';

import { mongoSetup } from './../../../models';

describe('mongo service', () => {
    let services;
    let models;

    const getfinalData = function(data) {
        data = (typeof(data.get) !== 'undefined') ? data.get({ plain: true}) : data;

        const finalData: Object = {'data': data.data || [], 'pagination': data.pagination || {}};

        return finalData['data'];
    };

    beforeEach( (done) => {
        services = new Mongo(baseConfig);
        models = mongoSetup();

        done();
    });

    it('should check if models exists', (done) => {
        expect(models.queueLogs).to.exist;
        expect(models.queueLogs.find).to.exist;
        expect(models.queueLogs.find).to.be.a('function');
        expect(models.queueLogs.findOne).to.exist;
        expect(models.queueLogs.findOne).to.be.a('function');
        expect(models.queueLogs.insertMany).to.exist;
        expect(models.queueLogs.insertMany).to.be.a('function');
        expect(models.queueLogs.findOneAndUpdate).to.exist;
        expect(models.queueLogs.findOneAndUpdate).to.be.a('function');
        expect(models.queueLogs.findOneAndRemove).to.exist;
        expect(models.queueLogs.findOneAndRemove).to.be.a('function');

        done();
    });

    it('should mock get all data', (done) => {
        services.getAllField(models.queueLogs, {})
            .then(
                (data) => {
                    expect(getfinalData(data)).to.be.a('Array');

                    done();
                }
            )
            .catch(done);
    });

    it('should get one data', (done) => {
        services.getOne(models.queueLogs, { '_id': '5f98e9c6a9a10067865ddb9f' })
            .then(
                (data) => {
                    expect(data).to.be.a('Object');

                    done();
                }
            )
            .catch(done);
    });
});
