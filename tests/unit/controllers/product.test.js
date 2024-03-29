const expect = require('chai').expect;
const sinon = require('sinon');

const productService = require('../../../services/product');
const productController = require('../../../contollers/product');

const mockproducts = [{
  id: 123,
  manufacturer: 'Apple',
  model: 'iPhone XS',
  price: 1799,
  description: 'Latest and most power iPhone with 5.8inch screen'
}, {
  id: 124,
  manufacturer: 'Apple',
  model: 'iPhone 11',
  price: 1798,
  description: 'Latest and most power iPhone with 5.8inch screen'
}];

describe('Product Controller', function() {
  let productListStub;
  let productServiceStub;
  beforeEach(() => {
    productServiceStub = sinon.stub(productService, "getProductList");
  })

  afterEach(() => {
    productServiceStub.restore();
  });
  
  describe("getProduct by id", function() {
    let req;
    let res;
    beforeEach(() => {
      req = { params: { id: 123 } };
      res = { json: function() {}, jsonp: function() {}, status: sinon.stub() };
    });

    it("should return a product that matches the id param", async function() {
      const stubValue = {
        id: 123,
        manufacturer: 'Apple',
        model: 'iPhone XS',
        price: 1799,
        description: 'Latest and most power iPhone with 5.8inch screen'
      };
      const mock = sinon.mock(res);
      mock
        .expects("jsonp")
        .once()
        .withExactArgs({ products: stubValue });
      const stub = productServiceStub.returns(stubValue);
      await productController.getProducts(req, res);
      expect(stub.calledOnce).to.be.true;
      mock.verify();
    });
  });

  describe("getProduct list", function() {
    let req;
    let res;
    beforeEach(() => {
      req = { params: {} };
      res = { json: function() {}, jsonp: function() {}, status: sinon.stub() };
    });

    it("should return a list of product", async function() {
      const stubValue = mockproducts;
      const mock = sinon.mock(res);
      mock
        .expects("jsonp")
        .once()
        .withExactArgs({ products: stubValue });
      const stub = productServiceStub.returns(stubValue);
      await productController.getProducts(req, res);;
      expect(stub.calledOnce).to.be.true;
      mock.verify();
    });
  });
});