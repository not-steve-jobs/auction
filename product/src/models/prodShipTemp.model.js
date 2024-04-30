// NPM Modules
import { Model } from 'objection';

// Local Modules

class ProdShipTempModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'prod_ship_temp'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        product_id: { type: 'integer' },
        ship_template_id: { type: 'integer' },
      }
    };
  }

  $formatJson(json) {
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
  static create(trx, payload) {
    return ProdShipTempModel.query(trx).insert(payload).returning('*');
  }
}

export default ProdShipTempModel;
