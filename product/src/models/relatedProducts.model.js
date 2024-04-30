// NPM Modules
import { Model } from 'objection';
import { CryptoUtil } from '../utils';
import { ProductsModel } from './index';

// Local Modules

class RelatedProductsModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'related_products'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        parent_id: { type: 'integer' },
        child_id: { type: 'integer' },
      }
    };
  }

  static get relationMappings() {
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: ProductsModel,
        join: {
          from: 'related_products.child_id',
          to: 'products.id'
        }
      },
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

  $afterFind(queryContext) {
    if (this.id) {
      this.parent_id = CryptoUtil.encryptByKey(this.parent_id);
      this.child_id = CryptoUtil.encryptByKey(this.child_id);
      this.id = CryptoUtil.encryptByKey(this.id);
    }
    return super.$afterFind(queryContext);
  }

  // Methods
  static create(trx, payload) {
    return RelatedProductsModel.query(trx).insert(payload).returning('*');
  }
}

export default RelatedProductsModel;
