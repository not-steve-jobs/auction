// NPM Modules
import { Model } from 'objection';

// Local Modules
import { CryptoUtil } from '../utils';

class PostalCodesModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'postal_codes'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        code: { type: 'string' },
        city_id: { type: 'integer' }
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
      this.city_id = CryptoUtil.encryptByKey(this.city_id);
    }
    return super.$afterFind(queryContext);
  }

  // Methods

  static list() {
    return PostalCodesModel
      .query()
      .select('*');
  }

  static getById(id) {
    return PostalCodesModel
      .query()
      .select('*')
      .where('id', id);
  }

  static getFullDataByCityId(city_id) {
    return PostalCodesModel
      .query()
      .select('*')
      .where('city_id', city_id);
  }
}

export default PostalCodesModel;
