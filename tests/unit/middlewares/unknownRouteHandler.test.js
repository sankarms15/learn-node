const expect = require('chai').expect;

const unknownRoute = require('../../../middlewares/unknownRouteHandler');

describe("Middleware: Unknown Route", function() {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {};
    res = {
      status: null,
      body: null,
      status: function(status) {
        this.status = status;
        return this;
      },
      json: function(body) {
        this.body = body;
        return this;
      }
    };
    next = data => {
      return data;
    };
  
  })
 
  it(`should return status 404 with message expected message 'Not Found.`, () => {

    unknownRoute(req, res, next);

    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal('Not Found.');

  });
});