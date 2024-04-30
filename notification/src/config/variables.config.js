// Local Modules
import 'dotenv/config';

const config = {
  PORT: process.env.PORT,
  CORS: process.env.CORS?.split(','),

  FROM_EMAIL: process.env.FROM_EMAIL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
};

export default config;
