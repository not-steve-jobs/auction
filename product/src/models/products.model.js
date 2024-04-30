// NPM Modules
import { Model } from 'objection';

// Local Modules
import { ProductStatusEnum, SaleTypeEnum } from '../enum';
import FilesModel from './files.model';
import CategoriesModel from './categories.model';
import { CryptoUtil } from '../utils';
import { RelatedProductsModel } from './index';

class ProductsModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'products'; }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        desc: { type: 'string' },
        creator_id: { type: 'integer' },
        category_id: { type: 'integer' },
        sale_type: { type: 'string', enum: Object.values(SaleTypeEnum) },
        extra_data: { type: 'string' },
        one_time_sale: { type: 'string' },
        status: { type: 'string', enum: Object.values(ProductStatusEnum) },
      }
    };
  }

  static get relationMappings() {
    return {
      files: {
        relation: Model.HasManyRelation,
        modelClass: FilesModel,
        join: {
          from: 'products.id',
          to: 'files.resource_id'
        }
      },

      categories: {
        relation: Model.HasManyRelation,
        modelClass: CategoriesModel,
        join: {
          from: 'products.category_id',
          to: 'categories.id'
        }
      },

      related_products: {
        relation: Model.HasManyRelation,
        modelClass: RelatedProductsModel,
        join: {
          from: 'products.id',
          to: 'related_products.parent_id'
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
    if (this.id) {
      this.id = CryptoUtil.encryptByKey(this.id);
    }
    return super.$afterFind(queryContext);
  }

  // Methods
  static create(trx, payload) {
    payload.extra_data = JSON.stringify(payload.extra_data);
    return ProductsModel.query(trx).insert(payload).returning('*');
  }

  static async allProducts(offset = 0, search) {
    const filter = (qb) => {
      if (search) {
        console.log(search);
        // qb.orWhere('products.id', search); // TODO need to discussed, its not working
        qb.orWhereLike('products.name', search);
        qb.orWhereLike('products.condition', search);
      }
    };

    const products = ProductsModel.query()
      .select('*')
      .withGraphFetched('categories')
      .modifyGraph('categories', (builder) => {
        builder.select('id', 'name', 'parent', 'status');
      })
      .withGraphFetched('related_products')
      .modifyGraph('related_products', (builder) => {
        builder.select('id', 'parent_id', 'child_id');
        builder.withGraphFetched('products')
          .modifyGraph('products', (prodBuilder) => {
            prodBuilder.withGraphFetched('categories')
              .modifyGraph('categories', (categoryBuilder) => {
                categoryBuilder.select('id', 'name', 'parent', 'status');
              });
            prodBuilder.withGraphFetched('files');
          });
      })
      .withGraphFetched('files')
      .modifyGraph('files', (builder) => {
        builder.select('id', 'name', 'type', 'url', 'resource_id', 'module', 'created_at');
      });

    if (search) products.where(filter);

    products
      .limit(10)
      .offset(offset)
      .orderBy('id', 'desc');

    return products;
  }

  static getProductById(id) {
    return ProductsModel.query()
      .select('products.id',
        'name',
        'status',
        'desc',
        'category_id',
        'extra_data',
        'sale_type',
        'status',
        'created_at',
        'updated_at',)
      .withGraphFetched('files')
      .modifyGraph('files', (builder) => {
        builder.select('id', 'name', 'type', 'url', 'resource_id', 'module', 'created_at');
      })
      .where({ id });
  }

  static getMyProductsById(ids, myId) {
    return ProductsModel.query()
      .select()
      .withGraphFetched('files')
      .modifyGraph('files', (builder) => {
        builder.select('id', 'name', 'type', 'url', 'resource_id', 'module', 'created_at');
      })
      .whereIn('id', ids)
      .whereIn('creator_id', myId);
  }

  static bulkDeleteProductsById(ids) {
    return ProductsModel.query()
      .delete()
      .whereIn('id', ids);
  }

  static findByUserName(user_name) {
    return ProductsModel.query()
      .findOne({ user_name });
  }
}

export default ProductsModel;
