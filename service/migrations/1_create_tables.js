// NPM Modules
import knex from 'knex';

// Local Modules
import { LoggerUtil } from '../src/utils';
import { FileTypeEnum, ServiceStatusEnum } from '../src/enum';
import knexConfigs from '../knex.configs';

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
    })
    .createTable('files', (table) => {
      table.increments('id').primary();
      table.enum('type', Object.values(FileTypeEnum)).notNullable();
      table.string('url').notNullable();
      table.integer('resource_id');
      table.enum('module', ['product', 'service', 'portfolio']);
      table.string('name');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('service_categories', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('parent');
      table.integer('main_id');
      table.string('status');
      table.string('image');
      table.dateTime('created_at');
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    })
    .createTable('services', (table) => {
      table.increments('id').primary();
      table.string('description', 2000);
      table.integer('category_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('service_categories')
        .index();
      table.integer('creator_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .index();
      table.jsonb('extra_data');
      table.jsonb('portfolioIds');
      table.enum('status', Object.values(ServiceStatusEnum)).notNullable();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('portfolios', (table) => {
      table.increments('id').primary();
      table.string('description', 2000);
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('contacts', (table) => {
      table.increments('id').primary();
      table.integer('service_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('services')
        .index();
      table.string('contact_person', 100);
      table.jsonb('phones');
      table.jsonb('emails');
      table.jsonb('links');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    });
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await up(pg);
    LoggerUtil.info('Successfully created all tables ... ');
    process.kill(process.pid);
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();
