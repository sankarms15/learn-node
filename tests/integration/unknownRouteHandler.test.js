const request = require('supertest');
const expect = require("chai").expect;
const server = require('../../server');

describe('Unknown Route Handler', () => {
    it('Should return "404" message: "Not Found", on invalid route', (done) => {
        request(server).get("/apples").end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Not Found.');
            done();
        });
    });

    it('Should not return any errror', (done) => {
        request(server).get("/v1/ping").end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        });
    });
});