// NPM Modules
import Joi from 'joi';

// Local Modules
import { ProductStatusEnum, SaleTypeEnum } from '../../../enum';
import Types from './types';
import config from '../../../config/variables.config';

const { WEEKDAYS } = config;
const { ID, hashID } = Types;

const validateShippingData = (value) => {
  if (value?.shipping?.seller_delivery === true && !value?.shipping?.shipping_templates && !value?.shipping?.shipping_template_ids) {
    throw new Error('Both shipping_templates and shipping_template_ids cannot be empty.');
  }
  return value;
};

const ProductsSchema = {
  addSchema: {
    body: Joi.object({
      status: Joi.string().valid(...Object.values(ProductStatusEnum)).required(),

      product: Joi.when('status', {
        is: 'draft',
        then: Joi.object({
          name: Joi.string().min(3).max(255).required(),
          category_id: hashID.required(),
          desc: Joi.string().min(3).max(2000),
          sale_type: Joi.string().valid(...Object.values(SaleTypeEnum)),

          extra_data: Joi.array(),
          //     .items(Joi.object({
          //   name: Joi.string().required(),
          //   value: Joi.string().required(),
          // })),

          auction: Joi.when('sale_type', {
            is: 'auction',
            then: Joi.object({
              duration: Joi.number().integer().min(0).max(10)
                .required(),
              start_time: Joi.date().greater('now'),
              start_price: Joi.number().min(0),
              quantity: ID,
              direct_sales_price: Joi.number().min(0),
              min_insured_price: Joi.number().min(0),
              min_allowed_price: Joi.number().min(0),
              automatic_acceptance_price: Joi.number().min(0),
            }).required(),
            otherwise: Joi.forbidden()
          }),
          one_time_sale: Joi.when('sale_type', {
            is: 'oneTimeSale',
            then: Joi.object({
              start_price: Joi.number().greater(0),
              quantity: ID,
              min_allowed_price: Joi.number().greater(0),
              automatic_acceptance_price: Joi.number().greater(0),
              start_time: Joi.date().greater('now'),
            }),
            otherwise: Joi.forbidden()
          }).required(),
          discount: Joi.when('sale_type', {
            is: 'oneTimeSale',
            then: Joi.array().items(Joi.object({
              quantity: ID.required(),
              percent: Joi.number().greater(0).required(),
            })).min(1),
            otherwise: Joi.forbidden()
          }),
          related_products: Joi.array().items(Joi.object({ child_id: hashID.required() })),
        }),

        otherwise: Joi.object({
          category_id: hashID.required(),
          name: Joi.string().min(3).max(255).required(),
          desc: Joi.string().min(3).max(2000),
          sale_type: Joi.string().valid(...Object.values(SaleTypeEnum)).required(),
          extra_data: Joi.array(),
          //     .items(Joi.object({
          //   name: Joi.string().required(),
          //   value: Joi.string().required(),
          // })),

          auction: Joi.when('sale_type', {
            is: 'auction',
            then: Joi.object({
              duration: Joi.number().integer().min(0).max(10)
                .required(),
              start_time: Joi.date().greater('now').required(),
              start_price: Joi.number().min(0).required(),
              quantity: ID.required(),
              direct_sales_price: Joi.number().min(0),
              min_insured_price: Joi.number().min(0),
              min_allowed_price: Joi.number().min(0),
              automatic_acceptance_price: Joi.number().min(0),
            }).required(),
            otherwise: Joi.forbidden()
          }),
          one_time_sale: Joi.when('sale_type', {
            is: 'oneTimeSale',
            then: Joi.object({
              start_time: Joi.date().greater('now').required(),
              start_price: Joi.number().greater(0).required(),
              quantity: ID.required(),
              min_allowed_price: Joi.number().greater(0),
              automatic_acceptance_price: Joi.number().greater(0),
            }).required(),
            otherwise: Joi.forbidden()
          }),
          discount: Joi.when('sale_type', {
            is: 'oneTimeSale',
            then: Joi.array().items(Joi.object({
              quantity: ID.required(),
              percent: Joi.number().greater(0).required(),
            })).min(1),
            otherwise: Joi.forbidden()
          }),
          related_products: Joi.array().items(Joi.object({ child_id: hashID.required() })),
        }),
      }).required(),

      shipping: Joi.object({
        can_be_approached: Joi.boolean().default(false),
        seller_delivery: Joi.boolean().default(false),
        region_id: hashID.required(),
        city_id: hashID.required(),
        postal_code_id: hashID.required(),
        address: Joi.string().min(3).max(100).required(),

        client_approach: Joi.when('can_be_approached', {
          is: true,
          then: Joi.object({
            preferred_days: Joi.array().items(Joi.string().valid(...WEEKDAYS)).unique().min(1)
              .required(),
            preferred_hours: Joi.array().items(Joi.string()).unique().min(1)
              .required(),
          }),
          otherwise: Joi.forbidden()
        }).required(),

        shipping_templates: Joi.when('seller_delivery', {
          is: true,
          then: Joi.array().items(
            Joi.object({
              name: Joi.string().min(3).max(255),
              template: Joi.boolean().default(false),
              place_data: Joi.array().items(Joi.object({
                name: Joi.string().required(),
                id: hashID.required(),
                cities: Joi.array().items(Joi.object({
                  name: Joi.string().required(),
                  id: hashID.required(),
                })).required(),
                all_cities: Joi.boolean().required(),
              })).required(),
              days: ID.required(),
              price: Joi.number().greater(0).required(),
            })
          ),
          otherwise: Joi.forbidden()
        }),

        shipping_template_ids: Joi.when('seller_delivery', {
          is: true,
          then: Joi.object({ ids: Joi.array().items(hashID.required()).required(), }),
          otherwise: Joi.forbidden()
        }),
      }),
    }).custom(validateShippingData),
  },

  addShippingTemplateSchema: {
    body: Joi.object({
      name: Joi.string().min(3).max(255),
      remember: Joi.boolean().default(false).required(),
      delivery_regions: Joi.array().items(Joi.string().required()).required(),
      delay: ID.required(),
      price: Joi.number().min(0),
    }),
  },

  getCategoriesSchema: { query: Joi.object({ search: Joi.string().min(1).max(95) }) },

  getCategorySchema: { params: Joi.object({ parent_id: hashID.required() }) },

  getByIdSchema: { params: Joi.object({ id: hashID.required(), }) },

  deleteByIdsSchema: { body: Joi.object({ ids: Joi.array().items(Joi.string().min(3).max(255).required()), }) },

  getCitiesByRegionIdSchema: { params: Joi.object({ region_id: hashID.required(), }) },

  getPostalCodesByCityIdSchema: { params: Joi.object({ city_id: hashID.required(), }) },
};

export default ProductsSchema;
