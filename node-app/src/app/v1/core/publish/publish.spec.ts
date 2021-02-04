import * as supertest from 'supertest';
import { expect } from 'chai';

import app from '../../../../app';

const authKey: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCBtZSIsInBlcm1pc3Npb25MZXZlbCI6MX0.vu1blTlYf67J2K6HNwTTMtofv4KjdYp5kdYKUgOapPU';

describe('publish component', () => {
    it('should publish', (done) => {
        supertest(app).post('/v1/core/publish?test=true')
            .set('Authorization', `Bearer ${authKey}`)
            .send({
                'type': 'logJobs',
                'data': {
                    'abc': 'def'
                },
                'message': 'this is test'
            })
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                expect(res.body.status).to.equal('success');

                done();
            });
    });
});
