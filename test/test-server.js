const {app} = require('../server');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;

chai.use(chaiHTTP);

describe('API', function () {
    it('should get 200 response', function () {
        return chai.request(app)
            .get('/videos')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
            });
    });
});