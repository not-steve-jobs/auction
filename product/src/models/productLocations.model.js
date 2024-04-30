// NPM Modules
import { Model } from 'objection';

// Local Modules
import { CryptoUtil } from '../utils';

class ProductLocationsModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'product_locations'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        product_id: { type: 'integer' },
        city_id: { type: 'integer' },
        postal_code_id: { type: 'integer' },
        address: { type: 'string' },
        can_be_approached: { type: 'boolean' },
        preferred_days: { type: 'string' },
        preferred_hours: { type: 'string' },
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

  // Methods
  static create(trx, payload) {
    return ProductLocationsModel.query(trx).insert(payload).returning('*');
  }
}

export default ProductLocationsModel;
