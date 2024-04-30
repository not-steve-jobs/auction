// NPM Modules
import { Model } from 'objection';
import { CategoryEnum } from '../enum';

// Local Modules
import { CryptoUtil } from '../utils';

// eslint-disable-next-line import/no-cycle
import ServicesModel from './services.model';
import SearchBuilder from './builder/search.builder';
import PSQLStorage from '../storage/psql.storage';

class ServiceCategoriesModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'service_categories'; }

  static get QueryBuilder() { return SearchBuilder; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        main_id: { type: 'integer' },
        name: { type: 'string' },
        image: { type: 'string' },
        parent: { type: 'integer' },
        status: { type: 'string', enum: Object.values(CategoryEnum) },
      }
    };
  }

  static get relationMappings() {
    return {
      filter: (query) => query.select('id', 'name'),
      subCategories: {
        relation: Model.HasManyRelation,
        modelClass: ServiceCategoriesModel,
        join: {
          from: 'service_categories.id',
          to: 'service_categories.parent'
        }
      },
      parentCategories: {
        relation: Model.HasManyRelation,
        modelClass: ServiceCategoriesModel,
        join: {
          from: 'service_categories.parent',
          to: 'service_categories.id'
        }
      },
      services: {
        relation: Model.HasManyRelation,
        modelClass: ServicesModel,
        join: {
          from: 'service_categories.id',
          to: 'services.category_id'
        }
      },
    };
  }

  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  $afterFind(queryContext) {
    if (this.id) this.id = CryptoUtil.encryptByKey(this.id);

    return super.$afterFind(queryContext);
  }

  // Methods
  static getServicesByUserId(user_id, status) {
    const { knex } = PSQLStorage;
    return ServiceCategoriesModel.query()
      .select('scp.name as parent_cat_name',
        'scp.id as parent_cat_id',
        knex.raw('ARRAY_AGG(service_categories.name) as child_cat_name'),
        knex.raw('ARRAY_AGG(service_categories.id) as child_cat_id'),
        knex.raw('ARRAY_AGG(s.id) as service_id'),
        knex.raw('ARRAY_AGG(s.description) as service_desc'),
        knex.raw('ARRAY_AGG(s.status) as service_status'),
        knex.raw('ARRAY_AGG(contacts.contact_person) as service_contact_person'),
        knex.raw('ARRAY_AGG(contacts.links) as service_contact_links'),
        knex.raw('ARRAY_AGG(contacts.phones) as service_contact_phones'),
        knex.raw('ARRAY_AGG(contacts.emails) as service_contact_emails'),)
      .leftJoin('services as s', 'service_categories.id', 's.category_id')
      .leftJoin('contacts', 'contacts.service_id', 's.id')
      .leftJoin('service_categories as scp', 'scp.id', 'service_categories.main_id')
      .where('s.creator_id', user_id)
      .where((builder) => {
        if (status) {
          builder
            .where('s.status', '=', status);
        }
      })
      .groupBy('scp.id')
      .orderBy('scp.id');
  }

  static getAllServices(status) {
    const { knex } = PSQLStorage;

    return ServiceCategoriesModel.query()
        .select('scp.name as parent_cat_name',
            'scp.id as parent_cat_id',
            knex.raw('ARRAY_AGG(service_categories.name) as child_cat_name'),
            knex.raw('ARRAY_AGG(service_categories.id) as child_cat_id'),
            knex.raw('ARRAY_AGG(s.id) as service_id'),
            knex.raw('ARRAY_AGG(s.description) as service_desc'),
            knex.raw('ARRAY_AGG(s.status) as service_status'),
            knex.raw('ARRAY_AGG(contacts.contact_person) as service_contact_person'),
            knex.raw('ARRAY_AGG(contacts.links) as service_contact_links'),
            knex.raw('ARRAY_AGG(contacts.phones) as service_contact_phones'),
            knex.raw('ARRAY_AGG(contacts.emails) as service_contact_emails'),
            knex.raw('ARRAY_AGG(service_categories.id) as service_category_id'), // Include service_categories.id
            knex.raw('(SELECT COUNT(*) FROM services as sub_s WHERE sub_s.category_id = service_categories.id AND sub_s.status = $1) as service_count')
        )
        .leftJoin('services as s', 'service_categories.id', 's.category_id')
        .leftJoin('contacts', 'contacts.service_id', 's.id')
        .leftJoin('service_categories as scp', 'scp.id', 'service_categories.main_id')
        .where((builder) => {
          if (status) {
            builder
                .where('s.status', '=', status);
          }
        })
        .groupBy('scp.id', 'scp.name', 'service_categories.id') // Include 'service_categories.id' in the grouping
        .orderBy('scp.id');
  }



  static getByLastCategoryId(subcategoryId) {
    return ServiceCategoriesModel.query()
      .withRecursive('CategoryPath', (qb) => {
        qb
          .select('id', 'name', 'parent')
          .from('service_categories')
          .where('id', subcategoryId)
          .unionAll((innerQb) => { // Rename 'qb' to 'innerQb'
            innerQb
              .select('c.id', 'c.name', 'c.parent')
              .from('service_categories as c')
              .innerJoin('CategoryPath as cp', 'c.id', 'cp.parent');
          });
      })
      .select('id', 'name')
      .from('CategoryPath');
  }

  static getAllParents(status) {
    return ServiceCategoriesModel.query()
      .withGraphFetched('subCategories.[subCategories.^]')
      .where('parent', null)
      .where((builder) => {
        if (status) {
          builder.where('service_categories.status', status);
        }
      });
  }

  static getByParentId(parentId) {
    return ServiceCategoriesModel.query()
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

  static getByChildId(childId) {
    return ServiceCategoriesModel.query()
      .select('id', 'name')
      .withGraphFetched('parentCategories')
      .modifyGraph('parentCategories', (sub) => {
        sub.select('id', 'name');
        sub.where('status', CategoryEnum.active);
        sub.orderBy('id', 'ASC');
      })
      .where('status', CategoryEnum.active)
      .whereIn('id', childId);
  }

  static getMainByChildId(childId) {
    return ServiceCategoriesModel.query()
      .select('id', 'name')
      .withGraphFetched('parentCategories')
      .modifyGraph('parentCategories', (sub) => {
        sub.select('id', 'name');
        sub.where('status', CategoryEnum.active);
        sub.orderBy('id', 'ASC');
      })
      .where('id', childId);
  }

  static getParentByChildId(childId) {
    return ServiceCategoriesModel.query()
      .select('id', 'name')
      .withGraphFetched('subCategories')
      .modifyGraph('subCategories', (sub) => {
        sub.select('id', 'name');
        sub.where('status', CategoryEnum.active);
        sub.orderBy('id', 'ASC');
      })
      .where('status', CategoryEnum.active)
      .where('id', childId);
  }

  static create(payload, trx) {
    return ServiceCategoriesModel.query(trx).insert(payload).returning('*');
  }
}

export default ServiceCategoriesModel;
