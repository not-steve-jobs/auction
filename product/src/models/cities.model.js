// NPM Modules
import { Model } from 'objection';

// Local Modules
import { CryptoUtil } from '../utils';
import PostalCodesModel from './postalCodes.model';

class CitiesModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'cities'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        region_id: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    return {
      postal_codes: {
        relation: Model.HasManyRelation,
        modelClass: PostalCodesModel,
        join: {
          from: 'cities.id',
          to: 'postal_codes.city_id'
        }
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
      this.region_id = CryptoUtil.encryptByKey(this.region_id);
    }
    return super.$afterFind(queryContext);
  }

  // Methods

  static getFullDataByRegionId(region_id) {
    return CitiesModel
      .query()
      .select('*')
      .withGraphFetched('postal_codes')
      .where('region_id', region_id);
  }
}

export default CitiesModel;
