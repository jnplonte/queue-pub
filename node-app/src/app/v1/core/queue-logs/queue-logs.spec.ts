import * as supertest from 'supertest';
import { expect } from 'chai';

import app from '../../../../app';

const authKey: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCBtZSIsInBlcm1pc3Npb25MZXZlbCI6MX0.vu1blTlYf67J2K6HNwTTMtofv4KjdYp5kdYKUgOapPU';
let testName: string = '';

describe('queue-logs component', () => {
    it('should get all queue logs', (done) => {
        supertest(app).get('/v1/core/queuelogs?test=true')
            .set('Authorization', `Bearer ${authKey}`)
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                expect(res.body.status).to.equal('success');
                expect(res.body.data).to.be.a('Array');

                done();
            });
    });

    it('should create queue logs', (done) => {
        supertest(app).post('/v1/core/queuelogs?test=true')
            .set('Authorization', `Bearer ${authKey}`)
            .send({
                'message': 'queue-logs-test',
                'data': {}
            })
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                testName = res.body.data['_id'] || '';
                expect(res.body.status).to.equal('success');

                done();
            });
    });

    it('should get queue logs', (done) => {
        supertest(app).get(`/v1/core/queuelogs/${testName}?test=true`)
            .set('Authorization', `Bearer ${authKey}`)
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                expect(res.body.status).to.equal('success');
                expect(res.body.data).to.be.a('Object');

                done();
            });
    });

    it('should update queue logs', (done) => {
        supertest(app).put(`/v1/core/queuelogs/${testName}?test=true`)
            .set('Authorization', `Bearer ${authKey}`)
            .send({
                'name': 'queue-logs-test-update'
            })
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                expect(res.body.status).to.equal('success');

                done();
            });
    });

    it('should delete queue logs', (done) => {
        supertest(app).delete(`/v1/core/queuelogs/${testName}?test=true`)
            .set('Authorization', `Bearer ${authKey}`)
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                expect(res.body.status).to.equal('success');

                done();
            });
    });
});
