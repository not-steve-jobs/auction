// NPM Modules
import { Model } from 'objection';

// Local Modules

class UsersModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'users'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        full_name: { type: 'string' },
        user_name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        status: { type: 'string' },
        password: { type: 'string' },
        google_id: { type: 'string' },
        facebook_id: { type: 'string' },
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
  static create(payload, trx) {
    return UsersModel.bindTransaction(trx).query().insert(payload).returning('*');
  }

  static findByUsername(username) {
    return UsersModel.query().where('user_name', username).first().returning('*');
  }

  static async myProductsUsers(userId) {
    const myProducts = await UsersModel
      .query()
      .select('id')
      .where('id', userId);

    return myProducts.map((product) => product.id);
  }
}

export default UsersModel;
