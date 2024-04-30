// NPM Modules
import express from 'express';

// Local Modules
import notification from './notification.api';

const app = express();

// API
app.use('/notification', notification);

export default app;
