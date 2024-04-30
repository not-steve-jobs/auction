// NPM Modules
import { Model } from 'objection';

// Local Modules

class AuctionsModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'auctions'; }

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
        direct_sales_price: { type: 'number' },
        min_insured_price: { type: 'number' },
        min_allowed_price: { type: 'number' },
        automatic_acceptance_price: { type: 'number' },
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
    return AuctionsModel.query(trx).insert(payload).returning('*');
  }

  static async myProductsUsers(userId) {
    const myProducts = await AuctionsModel
      .query()
      .select('id')
      .where('creator_id', userId);

    return myProducts.map((product) => product.id);
  }
}

export default AuctionsModel;
