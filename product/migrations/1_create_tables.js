// NPM Modules
import knex from 'knex';

// Local Modules
import { LoggerUtil } from '../src/utils';
import {
  ProductStatusEnum, SaleTypeEnum, FileTypeEnum, ServiceStatusEnum
} from '../src/enum';
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
    .createTable('categories', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('parent');
      table.string('status');
      table.dateTime('created_at');
      table.dateTime('updated_at');
      table.dateTime('deleted_at');
    })
    .createTable('products', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('desc', 2000);
      table.integer('category_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('categories')
        .index();
      table.integer('creator_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .index();
      table.enum('sale_type', Object.values(SaleTypeEnum));
      // TODO Test not null and default
      table.boolean('one_time_sale');
      // Հավելյալ Բնութագիր
      table.jsonb('extra_data');
      table.enum('status', Object.values(ProductStatusEnum)).notNullable();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('files', (table) => {
      table.increments('id').primary();
      table.enum('type', Object.values(FileTypeEnum)).notNullable();
      table.string('url').notNullable();
      // Example product_id
      table.integer('resource_id');
      table.enum('module', ['product', 'service', 'portfolio']);
      table.string('name');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('auctions', (table) => {
      table.increments('id').primary();
      table.integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .index();
      table.dateTime('start_time').nullable().defaultTo(null);
      table.dateTime('end_time');
      table.decimal('start_price', 8, 2);
      table.integer('quantity').nullable().defaultTo(null);
      // Ուղիղ վաճառքի գին
      table.decimal('direct_sales_price', 8, 2);
      // Ապահովագրված նվազագույն գին
      table.decimal('min_insured_price', 8, 2);
      // @Թույլատրել գնառաջարկ ստանալ
      // Նվազագույն գին
      table.decimal('min_allowed_price', 8, 2);
      // Ավտոմատ ընդունման նվազագույն սահմանաչափ
      table.decimal('automatic_acceptance_price', 8, 2);
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('bids', (table) => {
      table.increments('id').primary();
      table.integer('auction_id')
        .unsigned()
        .references('id')
        .inTable('auctions')
        .index();
      table.integer('bidder_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .index();
      table.decimal('bid', 8, 2).notNullable();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('related_products', (table) => {
      table.increments('id').primary();
      table.integer('parent_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .index();
      table.integer('child_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .index();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('one_time_sales', (table) => {
      table.increments('id').primary();
      table.integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .index();
      table.dateTime('start_time').nullable();
      table.decimal('start_price', 8, 2).nullable();
      table.integer('quantity').nullable();
      // Թույլատրել գնառաջարկ ստանալ
      // Նվազագույն գին
      table.decimal('min_allowed_price', 8, 2);
      // Ավտոմատ ընդունման նվազագույն սահմանաչափ
      table.decimal('automatic_acceptance_price', 8, 2);
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('discounts', (table) => {
      table.increments('id').primary();
      table.integer('one_time_sale_id')
        .unsigned()
        .references('id')
        .inTable('one_time_sales')
        .index();
      table.integer('quantity').notNullable();
      table.decimal('percent', 8, 2).notNullable();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('countries', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('regions', (table) => {
      table.increments('id').primary();
      table.integer('country_id')
        .unsigned()
        .references('id')
        .inTable('countries')
        .index();
      table.string('name').notNullable();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('cities', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('region_id')
        .unsigned()
        .references('id')
        .inTable('regions')
        .index();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('postal_codes', (table) => {
      table.increments('id').primary();
      table.string('code').notNullable();
      table.integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .index();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('shipping_templates', (table) => {
      table.increments('id').primary();
      table.integer('creator_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .index();
      table.string('name');
      table.boolean('template');
      table.jsonb('place_data');
      table.integer('days');
      table.decimal('price', 8, 2);
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })

    .createTable('product_locations', (table) => {
      table.increments('id').primary();
      table.integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .index();
      table.integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .index();
      table.integer('postal_code_id')
        .unsigned()
        .references('id')
        .inTable('postal_codes')
        .index();
      table.string('address');
      table.boolean('can_be_approached');
      table.string('preferred_days');
      table.string('preferred_hours');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })

    .createTable('prod_ship_temp', (table) => {
      table.increments('id').primary();
      table.integer('product_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('products')
        .index();
      table.integer('ship_template_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('shipping_templates')
        .index();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('service_categories', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('parent');
      table.string('status');
      table.integer('main_id');
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
      table.jsonb('phones'); // Store "phones" as JSON
      table.jsonb('emails'); // Store "emails" as JSON
      table.jsonb('links'); // Store "links" as JSON
      table.dateTime('created_at');
      table.dateTime('updated_at');
    });

  // .createTable('delivery_services', (table) => {
  //   table.increments('id').primary();
  //   table.integer('product_location_id')
  //     .unsigned()
  //     .references('id')
  //     .inTable('product_locations')
  //     .index();
  //   table.integer('package_weight');
  //   table.integer('package_width');
  //   table.integer('package_length');
  //   table.enum('shipping_pay', Object.values(shippingPayEnum)).notNullable();
  // });
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
