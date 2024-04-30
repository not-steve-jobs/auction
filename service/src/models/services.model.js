// NPM Modules
import { Model } from 'objection';

// Local Modules
import { ServiceStatusEnum } from '../enum';
import FilesModel from './files.model';
import CategoriesModel from './serviceCategories.model';
import { CryptoUtil } from '../utils';

class ServicesModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'services'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        creator_id: { type: 'integer' },
        portfolioIds: { type: 'string' },
        category_id: { type: 'integer' },
        extra_data: { type: 'string' },
        status: { type: 'string', enum: Object.values(ServiceStatusEnum) },
      }
    };
  }

  static get relationMappings() {
    return {
      files: {
        relation: Model.HasManyRelation,
        modelClass: FilesModel,
        join: {
          from: 'services.id',
          to: 'files.resource_id'
        }
      },

      categories: {
        relation: Model.HasManyRelation,
        modelClass: CategoriesModel,
        join: {
          from: 'services.category_id',
          to: 'service_categories.id'
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

  $afterInsert(queryContext) {
    if (this.id) this.id = CryptoUtil.encryptByKey(this.id);

    if (this.category_id) this.category_id = CryptoUtil.encryptByKey(this.category_id);

    if (this.creator_id) this.creator_id = CryptoUtil.encryptByKey(this.creator_id);

    return super.$afterFind(queryContext);
  }

  // $beforeDelete() {
  //   this.deleted_at = new Date();
  // }

  // Methods
  static create(trx, payload) {
    return ServicesModel.query(trx).insert(payload).returning('*');
  }

  static getMyPortfolios(user_id) {
    return ServicesModel.query()
        .select('services.portfolioIds')
        .where('services.creator_id', user_id);
  }

  static getMyServicesIdsByUserId(user_id) {
    return ServicesModel.query()
        .select('service_categories.id', 'service_categories.name')
        .where('services.creator_id', user_id)
        .leftJoin('service_categories', 'services.category_id', 'service_categories.id')
  }

  static getAllServicesIdsByUserId(status) {
    return ServicesModel.query()
        .select(
            'services.id',
            'services.status',
            'contacts.contact_person',
            'contacts.phones',
            'contacts.emails',
            'contacts.links',
            'service_categories.id',
            'service_categories.name'
        )
        .where((builder) => {
          if (status) {
            builder
                .where('status', '=', status);
          }
        })
        .leftJoin('contacts', 'services.id', 'contacts.service_id')
        .leftJoin('service_categories', 'services.category_id', 'service_categories.id');
  }

  static getMyServicesByUserId(user_id, status) {
    return ServicesModel.query()
        .select(
            'services.id',
            'services.status',
            'contacts.contact_person',
            'contacts.phones',
            'contacts.emails',
            'contacts.links',
            'services.category_id'
        )
        .where(builder => {
          builder.where('services.creator_id', user_id);
          if (status !== undefined) {
            builder.where('services.status', status);
          }
        })
        .leftJoin('contacts', 'services.id', 'contacts.service_id')
        .skipUndefined()
  }


  static getMyServicesByStatus(status) {
    return ServicesModel.query()
        .select(
            'services.id',
            'services.status',
            'contacts.contact_person',
            'contacts.phones',
            'contacts.emails',
            'contacts.links',
            'services.category_id'
        )
        .where('services.status', status)
        .leftJoin('contacts', 'services.id', 'contacts.service_id')
        .skipUndefined(); // Use skipUndefined() to ignore undefined values.
  }

  // static getMyServicesByUserId(user_id, status) {
  //   return ServicesModel.query()
  //     .select(
  //       'services.id',
  //       'services.status',
  //       'contacts.contact_person',
  //       'contacts.phones',
  //       'contacts.emails',
  //       'contacts.links',
  //     )
  //     .where('services.creator_id', user_id)
  //     .withGraphFetched('categories')
  //     .modifyGraph('categories', (sub) => {
  //       sub.select('id', 'name');
  //       sub.where('status', CategoryEnum.active);
  //       sub.orderBy('id', 'ASC');
  //     })
  //     .where((builder) => {
  //       if (status) {
  //         builder
  //           .where('status', '=', status);
  //       }
  //     })
  //     .leftJoin('contacts', 'services.id', 'contacts.service_id');
  // }
  // static getMyServicesByUserId(user_id) {
  //   return ServicesModel.query()
  //     .select(
  //       'services.id',
  //       'services.status',
  //       'contacts.contact_person',
  //       'contacts.phones',
  //       'contacts.emails',
  //       'contacts.links',
  //       'service_categories.id',
  //       'service_categories.name'
  //     )
  //     .where('services.creator_id', user_id)
  //     .leftJoin('service_categories', 'services.category_id', 'service_categories.id')
  //     .leftJoin('contacts', 'services.id', 'contacts.service_id');
  // }
}

export default ServicesModel;
