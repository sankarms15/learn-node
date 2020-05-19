const expect = require("chai").expect;
const request = require("supertest");
const server = require('../../server');
const sinon = require('sinon');
const productList = require('../../lib/products');

const mockproducts = [{
    id: 123,
    manufacturer: 'Apple',
    model: 'iPhone XS',
    price: 1799,
    description: 'Latest and most power iPhone with 5.8inch screen'
  }];

describe('Product Route', function() {
    let productListStub;
    beforeEach(() => {
        productListStub = sinon.stub(productList, 'list');
    })

    afterEach(() => {
        productListStub.restore();
    });
    describe('GET /v1/products', () => {
        it('Should return list of products', (done) => {
            productListStub.resolves(mockproducts);
            request(server).get('/v1/products')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res.statusCode).to.equal(200);
                expect(res.body.products).to.have.lengthOf(4);
                done();
            });
        });
    });
    
    describe('GET /v1/products:id', () => {
        it('Should return one product that matches with given product ID', (done) => {
            productListStub.resolves(mockproducts);
            const productId = 123;
            request(server).get(`/v1/products/${productId}`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res.statusCode).to.equal(200);
                expect(res.body.products).to.have.property('id', productId);
                done();
            });
        });
    
        it('Should return "404" status on if product does not exists for the given "ID"', (done) => {
            productListStub.resolves(mockproducts);
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
        });
    
        it('should return "500" status on invalid request', (done) => {
            productListStub.resolves(mockproducts);
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
        });
    });
});

