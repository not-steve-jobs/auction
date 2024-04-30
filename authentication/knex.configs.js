// NPM Modules

// Local Modules
import config from './src/config/variables.config';

const { PSQL } = config;
const {
  PORT, HOST, DATABASE, USER, PASSWORD
} = PSQL;

export default {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      port: PORT,
      host: HOST,
      database: DATABASE,
      user: USER,
      password: PASSWORD
    }
  },
  // seeds: { directory: 'seeds/dev' },

  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      port: PORT,
      host: HOST,
      database: DATABASE,
      user: USER,
      password: PASSWORD
    }
  }
};
