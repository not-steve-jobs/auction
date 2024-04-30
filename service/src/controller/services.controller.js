// NPM modules

// Local Modules
import { ServicesService } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class ServicesController {
  static async getAllCategories(req, res, next) {
    try {
      const { status } = req.query;
      const categories = await ServicesService.getAllCategories(status);
      SuccessHandlerUtil.handleList(res, next, categories);
    } catch (error) {
      next(error);
    }
  }

  static async getMyPortfolios(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const myPortfolio = await ServicesService.getMyPortfolios(user.id);
      SuccessHandlerUtil.handleList(res, next, myPortfolio);
    } catch (error) {
      next(error);
    }
  }

  static async getMyServices(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const { status } = req.query;
      const myServices = await ServicesService.getMyServices(user.id, status);
      SuccessHandlerUtil.handleGetArr(res, next, myServices);
    } catch (error) {
      next(error);
    }
  }

  static async getAllServices(req, res, next) {
    try {
      const { status } = req.query;
      const myServices = await ServicesService.getAllServices(status);
      SuccessHandlerUtil.handleGetArr(res, next, myServices);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryByParentId(req, res, next) {
    try {
      const { parent_id } = req.params;
      const category = await ServicesService.getCategoryByParentId(parent_id);
      SuccessHandlerUtil.handleGet(res, next, category);
    } catch (error) {
      next(error);
    }
  }

  static async getMainCategoryPathByLastCategoryId(req, res, next) {
    try {
      const { last_category_id } = req.params;
      const category = await ServicesService.getMainCategoryPathByLastCategoryId(last_category_id);
      SuccessHandlerUtil.handleGet(res, next, category.reverse());
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { files } = req;
      const payload = req.body;
      payload.user_id = res.locals.auth.user.id;
      const newService = await ServicesService.add(payload, files);
      SuccessHandlerUtil.handleAdd(res, next, newService);
    } catch (error) {
      next(error);
    }
  }

  static async addPortfolio(req, res, next) {
    try {
      const { files } = req;
      const payload = req.body;
      const newService = await ServicesService.addPortfolio(payload, files);
      SuccessHandlerUtil.handleAdd(res, next, newService);
    } catch (error) {
      next(error);
    }
  }
}
