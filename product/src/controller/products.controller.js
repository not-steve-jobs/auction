// NPM modules

// Local Modules
import { ProductsService } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class ProductsController {
  static async getCategories(req, res, next) {
    try {
      const { search } = req.query;
      const categories = await ProductsService.getCategories(search);
      SuccessHandlerUtil.handleList(res, next, categories);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryByParentId(req, res, next) {
    try {
      const { parent_id } = req.params;
      const category = await ProductsService.getCategoryByParentId(parent_id);
      SuccessHandlerUtil.handleGet(res, next, category);
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { files } = req;
      const payload = req.body;
      payload.user_id = res.locals.auth.user.id;

      const newProduct = await ProductsService.add(payload, files);
      SuccessHandlerUtil.handleAdd(res, next, newProduct);
    } catch (error) {
      next(error);
    }
  }

  static async allProducts(req, res, next) {
    try {
      const { offset, search } = req.query;

      const products = await ProductsService.allProducts(offset, search);
      SuccessHandlerUtil.handleGetArr(res, next, products);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await ProductsService.getProductById(id);
      SuccessHandlerUtil.handleGet(res, next, product);
    } catch (error) {
      next(error);
    }
  }

  static async bulkDeleteProductsById(req, res, next) {
    try {
      const { ids } = req.body;
      const userId = res.locals.auth.user.id;

      const deletedProducts = await ProductsService.bulkDeleteProductsById(ids, userId);
      SuccessHandlerUtil.handleGet(res, next, deletedProducts);
    } catch (error) {
      next(error);
    }
  }

  static async allRegionsFullData(req, res, next) {
    try {
      const regions = await ProductsService.allRegionsFullData();
      SuccessHandlerUtil.handleList(res, next, regions);
    } catch (error) {
      next(error);
    }
  }

  static async allRegions(req, res, next) {
    try {
      const regions = await ProductsService.allRegions();
      SuccessHandlerUtil.handleList(res, next, regions);
    } catch (error) {
      next(error);
    }
  }

  static async allCitiesByRegionId(req, res, next) {
    try {
      const { region_id } = req.params;
      const cities = await ProductsService.allCitiesByRegionId(region_id);
      SuccessHandlerUtil.handleList(res, next, cities);
    } catch (error) {
      next(error);
    }
  }

  static async allPostalCodesByCityId(req, res, next) {
    try {
      const { city_id } = req.params;
      const cities = await ProductsService.allPostalCodesByCityId(city_id);
      SuccessHandlerUtil.handleList(res, next, cities);
    } catch (error) {
      next(error);
    }
  }
}
