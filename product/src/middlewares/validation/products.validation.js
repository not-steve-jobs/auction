// NPM modules

// Local modules
import { ProductsSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class ProductsValidationMiddleware {
  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ProductsSchema.addSchema, next);
  }

  static validateGetCategoriesArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ProductsSchema.getCategoriesSchema, next);
  }

  static validateGetCategoryArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ProductsSchema.getCategorySchema, next);
  }

  static validateGetByIdArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ProductsSchema.getByIdSchema, next);
  }

  static validateDeleteByIdsArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ProductsSchema.deleteByIdsSchema, next);
  }

  static validateGetCitiesByRegionIdArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ProductsSchema.getCitiesByRegionIdSchema, next);
  }

  static validateGetPostalCodesByCityIdArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ProductsSchema.getPostalCodesByCityIdSchema, next);
  }
}

export default ProductsValidationMiddleware;
