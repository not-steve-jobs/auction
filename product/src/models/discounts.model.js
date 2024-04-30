// NPM Modules
import { Model } from 'objection';

// Local Modules

class DiscountsModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'discounts'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        one_time_sale_id: { type: 'integer' },
        quantity: { type: 'integer' },
        percent: { type: 'number' },
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
    return DiscountsModel.query(trx).insert(payload).returning('*');
  }

  static async myProductsUsers(userId) {
    const myProducts = await DiscountsModel
      .query()
      .select('id')
      .where('creator_id', userId);

    return myProducts.map((product) => product.id);
  }
}

export default DiscountsModel;
