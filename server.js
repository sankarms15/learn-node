const express = require('express');
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const healthCheckRoute = require('./routes/healthCheckRoute');
const productRoute = require('./routes/productRoutes');
const unknownRouteHandler = require('./middlewares/unknownRouteHandler');
const swaggerDocument = require('./swagger.json');

const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/product-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/v1', productRoute);
app.use('/v1', healthCheckRoute);

app.use(unknownRouteHandler);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on port`, port);
});

module.exports = server;