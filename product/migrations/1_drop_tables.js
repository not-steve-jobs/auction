// NPM Modules
import knex from 'knex';

// Local Modules
import { LoggerUtil } from '../src/utils';
import knexConfigs from '../knex.configs';

// Dropping tables
function down(pg) {
  return pg.schema
    .raw('DROP TABLE IF EXISTS "discounts" CASCADE')
    .raw('DROP TABLE IF EXISTS "one_time_sales" CASCADE')
    .raw('DROP TABLE IF EXISTS "related_products" CASCADE')
    .raw('DROP TABLE IF EXISTS "bids" CASCADE')
    .raw('DROP TABLE IF EXISTS "auctions" CASCADE')
    .raw('DROP TABLE IF EXISTS "files" CASCADE')
    .raw('DROP TABLE IF EXISTS "products" CASCADE')
    .raw('DROP TABLE IF EXISTS "categories" CASCADE')
    .raw('DROP TABLE IF EXISTS "postal_codes" CASCADE')
    .raw('DROP TABLE IF EXISTS "cities" CASCADE')
    .raw('DROP TABLE IF EXISTS "regions" CASCADE')
    .raw('DROP TABLE IF EXISTS "countries" CASCADE')
    .raw('DROP TABLE IF EXISTS "delivery_services" CASCADE')
    .raw('DROP TABLE IF EXISTS "product_locations" CASCADE')
    .raw('DROP TABLE IF EXISTS "shipping_templates" CASCADE')
    .raw('DROP TABLE IF EXISTS "prod_ship_temp" CASCADE')
    .raw('DROP TABLE IF EXISTS "users" CASCADE')
    .raw('DROP TABLE IF EXISTS "contacts" CASCADE')
    .raw('DROP TABLE IF EXISTS "files" CASCADE')
    .raw('DROP TABLE IF EXISTS "services" CASCADE')
    .raw('DROP TABLE IF EXISTS "service_categories" CASCADE')
    .raw('DROP TABLE IF EXISTS "portfolios" CASCADE');
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
