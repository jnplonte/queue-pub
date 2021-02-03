import { expect } from 'chai';
import * as supertest from 'supertest';

import app from '../../../../app';

describe('token component', () => {
    it('should not be allowed to login user', (done) => {
        supertest(app).post('/v1/auth/token?test=true')
            .set('x-coupon-key', 'KuQmvnxXEjR7KXwfucgerTf6YwZV5Amz5awwxf5PFgkpGrb3Jn')
            .send({})
            .expect('Content-Type', /json/)
            .expect(400, (err, res) => {
                if (err) { return done(err); }

                expect(res.body.status).to.equal('failed');

                done();
            });
    });

    it('should login user by email', (done) => {
        supertest(app).post('/v1/auth/token?test=true')
            .set('x-coupon-key', 'KuQmvnxXEjR7KXwfucgerTf6YwZV5Amz5awwxf5PFgkpGrb3Jn')
            .send({
                'id': 'spiderman@gmail.com',
                'name': 'peter parker'
            })
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) { return done(err); }

                expect(res.body.status).to.equal('success');
                expect(res.body.data).to.be.a('string');

                done();
            });
    });
});
