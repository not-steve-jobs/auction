// Local Modules
import { ShippingTemplatesModel } from '../models';

export default class ShippingTemplateService {
  static async addShippingTemplate(payload) {
    return ShippingTemplatesModel.addShipTemplate(payload);
  }

  static async getTemplateById(payload) {
    return ShippingTemplatesModel.getTemplateById(payload);
  }

  static async allTemplates(offset, user_id) {
    return ShippingTemplatesModel.allTemplates(offset, user_id);
  }
}
