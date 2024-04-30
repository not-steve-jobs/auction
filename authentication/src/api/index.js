// NPM Modules
import express from 'express';

// Local Modules
import auth from './auth.api';

const app = express();

app.use('/auth', auth);

export default app;
