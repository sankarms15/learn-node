const expect = require("chai").expect;
const request = require("supertest");
const server = require('../../server');

describe('Health check Route', function() {
    it('should return the microservice version from package.json', (done) => {
        request(server).get('/v1/ping')
        .end((err, res) => {
            if (err) {
                done(err);
            }
            expect(res.statusCode).to.equal(200);
            expect(res.body.version).to.equal('1.0.0');
            done();
        });
    });

    it('should return "404" status on Invalid URL', (done) => {
        request(server).get('/v1/pong')
        .end((err, res) => {
            if (err) {
                done(err);
            }
            expect(res.statusCode).to.equal(404);
            expect(res.body.message).to.equal('Not Found.');
            done();
        });
    });
});