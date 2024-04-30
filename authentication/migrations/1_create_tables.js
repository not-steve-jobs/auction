// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';

// Local Modules
import { LoggerUtil } from '../src/utils';

function up(pg) {
  return pg.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('full_name').notNullable();
      table.string('user_name').notNullable().unique();
      table.string('email');
      table.string('phone');
      table.string('status');
      table.string('password');
      table.string('google_id').unique();
      table.string('facebook_id').unique();
      table.dateTime('created_at');
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    });
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await up(pg);
    console.log('Successfully created all tables ... ');
    process.kill(process.pid);
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();
