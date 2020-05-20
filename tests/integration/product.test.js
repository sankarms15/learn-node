const expect = require("chai").expect;
const request = require("supertest");
const server = require('../../server');
const sinon = require('sinon');
const productList = require('../../lib/products');

const productController = require('../../contollers/product');


describe('Product Route', function() {
    describe('GET /v1/products', () => {
        it('Should return list of products', (done) => {
            try {
                request(server).get('/v1/products')
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.products).to.have.lengthOf(4);
                    done();
                });
            } catch (err) {
                done(err)
            }
            
        });
    });
    
    describe('GET /v1/products:id', () => {
        it('Should return one product that matches with given product ID', (done) => {
            try {
                const productId = 123;
                request(server).get(`/v1/products/${productId}`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    console.log('errrrr :: ', err);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.products).to.have.property('id', productId);
                    done();
                });
            } catch (err) {
                done(err)
            }
            
        });
    
        it('Should return "404" status on if product does not exists for the given "ID"', (done) => {
            try {
                const productId = 128;
                request(server).get(`/v1/products/${productId}`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    expect(res.statusCode).to.equal(404);
                    expect(res.body.message).to.equal(`Product does not exist for the given id - ${productId}`);
                    done();
                });
            } catch (err) {
                done(err)
            }
            
        });
    
        it('should return "500" status on invalid request', (done) => {
            try {
                const productId = "'128'";
                request(server).get(`/v1/products/${productId}`)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    expect(res.statusCode).to.equal(500);
                    expect(res.body.message).to.equal('Invalid request.');
                    done();
                });
            } catch (err) {
                done(err)
            }
            
        });
    });
});