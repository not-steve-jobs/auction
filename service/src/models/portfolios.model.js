// NPM Modules
import { Model } from 'objection';
import { CryptoUtil } from '../utils';

// Local Modules

class PortfoliosModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'portfolios'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        description: { type: 'string' },
      },
    };
  }

  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  $afterInsert(queryContext) {
    if (this.id) this.id = CryptoUtil.encryptByKey(this.id);

    return super.$afterFind(queryContext);
  }

  // Methods
  static create(trx, payload) {
    return PortfoliosModel.query(trx).insert(payload).returning('*');
  }
}

export default PortfoliosModel;
