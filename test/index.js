const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp);

describe('API Endpoint Testing', () => {
	it('GET Landing Page', (done) => {
		chai.request(app)
			.get('/api/v1/member/landing-page')
			.end((error, response) => {
				expect(error).to.be.null;
				expect(response).to.have.status(200);
				expect(response.body).to.be.an('Object');
				expect(response.body).to.have.property('hero');
				expect(response.body.hero).to.have.all.keys(
					'travelers',
					'treasures',
					'cities'
				);
				expect(response.body).to.have.property('mostPicked');
				expect(response.body.mostPicked).to.have.an('array');
				expect(response.body).to.have.property('category');
				expect(response.body.category).to.have.an('array');
				expect(response.body).to.have.property('testimonial');
				expect(response.body.testimonial).to.be.an('object');
				done();
			});
	});
});
