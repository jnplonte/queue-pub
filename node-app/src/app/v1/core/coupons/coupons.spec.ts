import * as supertest from 'supertest';
import { expect } from 'chai';

import app from '../../../../app';

const authKey: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCBtZSIsInBlcm1pc3Npb25MZXZlbCI6MX0.vu1blTlYf67J2K6HNwTTMtofv4KjdYp5kdYKUgOapPU';
let testName: string = '';

describe('coupons component', () => {
    it('should get all coupons', (done) => {
        supertest(app).get('/v1/core/coupons?test=true')
            .set('Authorization', `Bearer ${authKey}`)
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                expect(res.body.status).to.equal('success');
                expect(res.body.data).to.be.a('Array');

                done();
            });
    });

    it('should create coupons', (done) => {
        supertest(app).post('/v1/core/coupons?test=true')
            .set('Authorization', `Bearer ${authKey}`)
            .send({
                'name': 'coupons-test',
                'code': 'CTEST'
            })
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                testName = res.body.data['_id'] || '';
                expect(res.body.status).to.equal('success');

                done();
            });
    });

    it('should get coupons', (done) => {
        supertest(app).get(`/v1/core/coupons/${testName}?test=true`)
            .set('Authorization', `Bearer ${authKey}`)
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                expect(res.body.status).to.equal('success');
                expect(res.body.data).to.be.a('Object');

                done();
            });
    });

    it('should update coupons', (done) => {
        supertest(app).put(`/v1/core/coupons/${testName}?test=true`)
            .set('Authorization', `Bearer ${authKey}`)
            .send({
                'name': 'coupons-test-update'
            })
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                expect(res.body.status).to.equal('success');

                done();
            });
    });

    it('should delete coupons', (done) => {
        supertest(app).delete(`/v1/core/coupons/${testName}?test=true`)
            .set('Authorization', `Bearer ${authKey}`)
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                expect(res.body.status).to.equal('success');

                done();
            });
    });
});
