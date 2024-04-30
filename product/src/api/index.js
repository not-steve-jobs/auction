// NPM modules
import express from 'express';

// Local modules
import products from './products.api';

const app = express();

app.use('/products', products);

export default app;
