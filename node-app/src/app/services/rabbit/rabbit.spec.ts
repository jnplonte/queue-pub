import { expect } from 'chai';
import { Rabbit } from './rabbit.service';
import { baseConfig } from '../../../config';

import { rabbitSetup } from '../../../rabbits';

describe('rabbit service', () => {
	let services;
	let rabbit;

	beforeEach((done) => {
		services = new Rabbit(baseConfig);
		rabbit = rabbitSetup();

		done();
	});

	it('should mock publish', (done) => {
		services
			.publish(rabbit, 'testJobs')
			.then((data) => {
				expect(data).to.be.a('Object');

				done();
			})
			.catch(done);
	});
});
