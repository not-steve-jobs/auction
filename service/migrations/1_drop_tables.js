// NPM Modules
import knex from 'knex';

// Local Modules
import { LoggerUtil } from '../src/utils';
import knexConfigs from '../knex.configs';

// Dropping tables
function down(pg) {
  return pg.schema
    .dropTableIfExists('contacts')
    .dropTableIfExists('files')
    .dropTableIfExists('services')
    .dropTableIfExists('service_categories')
    .dropTableIfExists('portfolios')
    .dropTableIfExists('users');
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await down(pg);
    console.log('Successfully dropped all tables ... ');
    process.kill(process.pid);
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();
