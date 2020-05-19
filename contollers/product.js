const productService = require('../services/product');

exports.getProducts = async (req, res) => {
    try {
        let products = null;        

        if(req && req.params.id) {
            const id = parseInt(req.params.id, 10);
            if(isNaN(id)) {
                return res.status(500).json({ message: 'Invalid request.' });
            }

            products = await productService.getProductList(id);
            
            if(!products) {
                return res.status(404).json({ message: `Product does not exist for the given id - ${req.params.id}` });
            }            
        } else {
            products = await productService.getProductList();
            if(!products || products.length === 0) {
                return res.status(500).json({ message: 'Products not available' });
            }
        }
        res.jsonp({products});
    } catch(e) {
        return res.status(500).json({message: e.message});
    }
}
