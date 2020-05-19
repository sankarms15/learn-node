const { list } = require('../lib/products');

exports.getProductList = async (productId = null) => {
    try {
      let products = await list();
      if(productId) {
        console.log(productId);
        products = products.find(prd => prd.id === productId);
      } else {
        products = products.map(prd => ({id: prd.id, manufacturer: prd.manufacturer, model: prd.model}));
      }
      return products;
    } catch (err) {
      throw err;
    }
}
