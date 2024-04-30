// NPM modules

// Local Modules
import { ShippingTemplateService } from '../services';
import { CryptoUtil, SuccessHandlerUtil } from '../utils';

export default class ShippingController {
  static async addShippingTemplate(req, res, next) {
    try {
      const payload = req.body;
      payload.creator_id = CryptoUtil.decryptByKey(res.locals.auth.user.id);

      const newShippingTemplate = await ShippingTemplateService.addShippingTemplate(payload);
      SuccessHandlerUtil.handleAdd(res, next, newShippingTemplate);
    } catch (error) {
      next(error);
    }
  }

  static async allTemplates(req, res, next) {
    try {
      const { offset } = req.query;
      const user_id = CryptoUtil.decryptByKey(res.locals.auth.user.id);

      const products = await ShippingTemplateService.allTemplates(offset, user_id);
      SuccessHandlerUtil.handleList(res, next, products);
    } catch (error) {
      next(error);
    }
  }

  static async getTemplateById(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = CryptoUtil.decryptByKey(res.locals.auth.user.id);

      const product = await ShippingTemplateService.getTemplateById({ id: CryptoUtil.decryptByKey(id), user_id });
      SuccessHandlerUtil.handleGet(res, next, product);
    } catch (error) {
      next(error);
    }
  }
}
