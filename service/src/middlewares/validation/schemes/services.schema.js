// NPM Modules
import Joi from 'joi';
import phone from 'phone';

// Local Modules
import Types from './types';
import { ServiceStatusEnum } from '../../../enum';

const { hashID } = Types;

const ServicesSchema = {
  addSchema: {
    body: Joi.object({
      category_id: hashID.required(),
      status: Joi.string().valid(...Object.values(ServiceStatusEnum)).required(),
      description: Joi.string().min(3).max(2000),
      extra_data: Joi.string().min(3).max(2000),
      portfolioIds: Joi.array().items(hashID.required()).max(50),
      contacts: Joi.object({
        contact_person: Joi.string().min(1).max(255).when('status', { is: 'draft', then: Joi.optional(), otherwise: Joi.required() }),
        phones: Joi.array().items(Joi.string().pattern(/^\+\d+$/).custom((value, helpers) => {
          if (!phone(value).isValid) {
            return helpers.message('Invalid phone number!');
          }
          return value;
        })).max(10).when('status', { is: 'draft', then: Joi.optional(), otherwise: Joi.required() }),
        emails: Joi.array().items(Joi.string().email().messages({ 'string.email': 'Invalid email address' })).min(1).max(10),
        links: Joi.array().items(Joi.object({
          link: Joi.string().uri().required(),
          social_platform: Joi.string().min(1).max(50).required(),
        })).max(10),
      }).when('status', { is: 'draft', then: Joi.optional(), otherwise: Joi.required() }),
    })
  },

  addPortfolioSchema: { body: Joi.object({ description: Joi.string().min(3).max(2000) }) },

  getAllServicesSchema: { query: Joi.object({ status: Joi.string().valid(...Object.values(ServiceStatusEnum)) }) },

  getMyServicesSchema: { query: Joi.object({ status: Joi.string().valid(...Object.values(ServiceStatusEnum)) }) },

  getCategoriesSchema: { query: Joi.object({ search: Joi.string().min(1).max(95) }) },

  getCategorySchema: { params: Joi.object({ parent_id: hashID.required() }) },

  getMainCategoryPathSchema: { params: Joi.object({ last_category_id: hashID.required() }) },

  getByIdSchema: { params: Joi.object({ id: Joi.string().min(3).max(255).required(), }) },

  deleteByIdsSchema: { body: Joi.object({ ids: Joi.array().items(Joi.string().min(3).max(255).required()), }) },
};

export default ServicesSchema;
