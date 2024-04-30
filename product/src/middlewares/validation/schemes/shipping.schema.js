// NPM Modules
import Joi from 'joi';

// Local Modules
import Types from './types';

const { ID, hashID } = Types;

const ShippingSchema = {
  addShippingTemplateSchema: {
    body: Joi.object({
      name: Joi.string().min(3).max(255),
      template: Joi.boolean().default(false).required(),
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
    }),
  },

  getByIdSchema: { params: Joi.object({ id: hashID.required() }) },

  getAllSchema: { query: Joi.object({ offset: Joi.number() }) }
};

export default ShippingSchema;
