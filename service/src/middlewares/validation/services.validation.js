// NPM modules

// Local modules
import { ServicesSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class ServicesValidationMiddleware {
  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ServicesSchema.addSchema, next);
  }

  static validateGetAllServicesArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ServicesSchema.getAllServicesSchema, next);
  }

  static validateGetMyServicesArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ServicesSchema.getMyServicesSchema, next);
  }

  static validateAddPortfolioArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ServicesSchema.addPortfolioSchema, next);
  }

  static validateGetCategoriesArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ServicesSchema.getCategoriesSchema, next);
  }

  static validateGetCategoryArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ServicesSchema.getCategorySchema, next);
  }

  static validateGetMainCategoryPathArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ServicesSchema.getMainCategoryPathSchema, next);
  }

  static validateGetByIdArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ServicesSchema.getByIdSchema, next);
  }

  static validateDeleteByIdsArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ServicesSchema.deleteByIdsSchema, next);
  }
}

export default ServicesValidationMiddleware;
