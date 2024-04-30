// NPM modules
import express from 'express';

// Local modules
import services from './services.api';

const app = express();

app.use('/services', services);

export default app;
