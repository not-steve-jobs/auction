// NPM Modules
import { Model } from 'objection';

// Local Modules

class OneTimeSaleModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'one_time_sales'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        product_id: { type: 'integer' },
        start_time: { type: 'string' },
        end_time: { type: 'string' },
        start_price: { type: 'number' },
        quantity: { type: 'integer' },
        min_allowed_price: { type: 'number' },
        automatic_acceptance_price: { type: 'number' },
      }
    };
  }

  $formatJson(json) { // TODO for what we need this ?
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  // Methods
  static getIds(ids) {
    return OneTimeSaleModel.query().select('id').whereIn('id', ids).returning('*');
  }

  static create(trx, payload) {
    return OneTimeSaleModel.query(trx).insert(payload).returning('*');
  }

  static bulkDeleteOneTimeSalesIds(ids) {
    return OneTimeSaleModel.query()
      .delete()
      .whereIn('id', ids);
  }
}

export default OneTimeSaleModel;
