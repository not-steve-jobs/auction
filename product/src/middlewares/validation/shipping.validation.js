// NPM modules

// Local modules
import { ShippingSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class ShippingValidationMiddleware {
  static validateAddShippingTemplateArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ShippingSchema.addShippingTemplateSchema, next);
  }

  static validateGetAllArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ShippingSchema.getAllSchema, next);
  }

  static validateGetByIdArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ShippingSchema.getByIdSchema, next);
  }
}

export default ShippingValidationMiddleware;
