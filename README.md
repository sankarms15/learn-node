# AMP Technical Test

This will be used to evaluate your skills as a Node JS developer in creating an API.

You are required to create an API using either ExpressJS or Koa.

The data for this API is provided by a function, which is exported in ```/lib/products.js```.

This function is asyncronous and returns a promise. It will randomly throw an error, in which case you must return the error as the response.

If it does not throw an error, it will return the data as an array after a random delay.

The data is in the following format:
```
[{
  id: Number,
  manufacturer: String,
  model: String,
  price: Number,
  description: String
}]
```

Example:
```
const { list } = require('./lib/product');

const listProduct = async function(req, res) {
  const products = await list();

  res.jsonp({
    products,
  });
}
```

# API Specifications
You must implement 3 endpoints in your API:

### /v1/products

This endpoint is used to get a listing of all the available products.

Example response:
```
{
  products: [
    {
      id: 125,
      manufacturer: 'Google',
      model: 'Pixel 3',
    },
    {
      id: 126,
      manufacturer: 'OnePlus',
      model: '6T',
    }
  ]
}
```

### /v1/products/:id

This endpoint is used to get more details about a product.

Example response:

```
{
  id: 126,
  manufacturer: 'OnePlus',
  model: '6T',
  price: 899,
  description: 'Latest OnePlus with a built-in fingerprint reader'
}
```

If the product does not exist for an id, the API should return a 404.

### /v1/ping

This endpoint is used as a health check. It should return the current version of the microservice in ```package.json```.

Example response:

```
{
  version: '1.0'
}
```

## Additional Requirements:
1. Any undefined URLs (eg ``` GET /pong ``` ) must return a HTTP 404 response with the following JSON body: 

```
{ message: 'Not Found.' }
```

2. You must write at least one integration test per endpoint. You can use any testing framework you like, but the test must be configured in ```package.json``` and executed as:

```
npm test
```

3. If the ```list()``` function returns an error, the API should return a HTTP 500 response along with the error.

# Test submission

Do not host your solution as a public repository on github.com. Please place this in a private repository (now available with all free GitHub acounts) and share access to the GitHub username provided to you by the person who contacted you about this technical test.

We will clone the repo and execute the following to evaluate your solution:

```
npm install (or yarn install)
npm test
```