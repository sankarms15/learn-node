const expect = require('chai').expect;
const sinon = require('sinon');
const productList = require('../../../lib/products');
const productService = require('../../../services/product');
const mockproducts = [
  {
    id: 123,
    manufacturer: 'Apple',
    model: 'iPhone XS',
    price: 1799,
    description: 'Latest and most power iPhone with 5.8inch screen'
  },
  {
    id: 124,
    manufacturer: 'Samsung',
    model: 'Note 9',
    price: 1499,
    description: 'Latest Note 9 with yellow stylus and 6.4inch screen'
  },
  {
    id: 125,
    manufacturer: 'Google',
    model: 'Pixel 3',
    price: 1399,
    description: 'Latest Pixel with the best camera in a smartphone'
  },
  {
    id: 126,
    manufacturer: 'OnePlus',
    model: '6T',
    price: 899,
    description: 'Latest OnePlus with a built-in fingerprint reader'
  }
];

describe('Product Service', function() {
    let products;
    let productListStub;
    beforeEach(() => {
        productListStub = sinon.stub(productList, 'list');
        products = mockproducts;
    });
    afterEach(() => {
        productListStub.restore();
      });
    describe('Get all product list', () => {
        it('should return the list of Product', async () => {
            productListStub.resolves(mockproducts);
            mockProduct = mockproducts.map(prd => ({id: prd.id, manufacturer: prd.manufacturer, model: prd.model}));           
            const result = await productService.getProductList();    
            expect(result).to.deep.equal(mockProduct);
        });

        it('should return the matched ProductId', async () => {
          productListStub.resolves(mockproducts);
          mockProduct = mockproducts.map(prd => ({id: prd.id, manufacturer: prd.manufacturer, model: prd.model}));           
          const result = await productService.getProductList(123);    
          expect(result).to.deep.equal({
            id: 123,
            manufacturer: 'Apple',
            model: 'iPhone XS',
            price: 1799,
            description: 'Latest and most power iPhone with 5.8inch screen'
          });
      });
    
        it('should throw an error while fetching the product', done => { 
            productListStub.rejects(new Error('An unknown error occurred'));
            productService.getProductList().catch(err => {
              expect(err.message).to.equal('An unknown error occurred');
              done();
            });
        });
    });
    
})