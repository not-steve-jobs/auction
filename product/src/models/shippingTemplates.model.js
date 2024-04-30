// NPM Modules
import { Model } from 'objection';

// Local Modules
import { CryptoUtil } from '../utils';

class ShippingTemplatesModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'shipping_templates'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        creator_id: { type: 'integer' },
        name: { type: 'string' },
        template: { type: 'boolean' },
        place_data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              id: { type: 'string' },
              cities: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    id: { type: 'string' }
                  }
                }
              },
              all_cities: { type: 'boolean' }
            }
          }
        },
        days: { type: 'integer' },
        price: { type: 'number' },
      }
    };
  }

  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  $afterFind(queryContext) {
    if (this.id) {
      this.id = CryptoUtil.encryptByKey(this.id);
    }
    return super.$afterFind(queryContext);
  }

  $afterInsert(queryContext) {
    if (this.id) {
      this.id = CryptoUtil.encryptByKey(this.id);
    }
    return super.$afterInsert(queryContext);
  }

  // Methods
  static addShipTemplate(payload) {
    return ShippingTemplatesModel.query().insert(payload).returning('*');
  }

  static addTemplate(trx, payload) {
    return ShippingTemplatesModel.query(trx).insert(payload).returning('*');
  }

  static async allTemplates(offset = 0, user_id) {
    const templates = ShippingTemplatesModel.query()
      .select('*')
      .where({ creator_id: user_id });

    templates
      .limit(10)
      .offset(offset)
      .orderBy('id', 'desc');

    return templates;
  }

  static getTemplateById(payload) {
    return ShippingTemplatesModel.query()
      .select('*')
      .where({ id: payload.id })
      .where({ creator_id: payload.user_id });
  }
}

export default ShippingTemplatesModel;
