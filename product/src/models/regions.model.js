// NPM Modules
import { Model } from 'objection';

// Local Modules
import { CryptoUtil } from '../utils';
import CitiesModel from './cities.model';

class RegionsModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'regions'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        country_id: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    return {
      cities: {
        relation: Model.HasManyRelation,
        modelClass: CitiesModel,
        join: {
          from: 'regions.id',
          to: 'cities.region_id'
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
      this.country_id = CryptoUtil.encryptByKey(this.country_id);
    }
    return super.$afterFind(queryContext);
  }

  // Methods

  static list() {
    return RegionsModel
      .query()
      .select('*');
  }

  static getFullData() {
    return RegionsModel
      .query()
      .select('*')
      .withGraphFetched('cities')
      .modifyGraph('cities', (m) => {
        m.withGraphFetched('postal_codes');
      });
  }

  static getById(id) {
    return RegionsModel
      .query()
      .select('*')
      .where('id', id);
  }
}

export default RegionsModel;
