// NPM Modules
import { Model } from 'objection';
import { CategoryEnum } from '../enum';

// Local Modules
import { CryptoUtil } from '../utils';

import SearchBuilder from './builder/search.builder';

class CategoriesModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'categories'; }

  static get QueryBuilder() { return SearchBuilder; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        parent: { type: 'integer' },
        status: { type: 'string', enum: Object.values(CategoryEnum) },
      }
    };
  }

  static get relationMappings() {
    return {
      subCategories: {
        relation: Model.HasManyRelation,
        modelClass: CategoriesModel,
        filter: (query) => query.select('id', 'name'),
        join: {
          from: 'categories.id',
          to: 'categories.parent'
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
    }
    return super.$afterFind(queryContext);
  }

  // Methods
  static getAllParents(search) {
    search = search?.replace(/\s+/g, ' ');

    const filter = (qb) => {
      if (search) {
        qb.whereILike('name', search);
      }
    };

    const categories = CategoriesModel.query()
      .select('id', 'name')
      // TODO get depth from config
      .withGraphFetched('subCategories.subCategories.subCategories.subCategories.subCategories.subCategories')
      .where('status', CategoryEnum.active)
      .where('parent', null);

    if (search) {
      categories.where(filter);
    }

    return categories;
  }

  static getByParentId(parentId) {
    return CategoriesModel.query()
      .select('id', 'name')
      .withGraphFetched('subCategories')
      .modifyGraph('subCategories', (sub) => {
        sub.select('id', 'name');
        sub.where('status', CategoryEnum.active);
        sub.orderBy('id', 'ASC');
      })
      .where('status', CategoryEnum.active)
      .where('parent', parentId);
  }

  static create(payload, trx) {
    return CategoriesModel.query(trx).insert(payload).returning('*');
  }
}

export default CategoriesModel;
