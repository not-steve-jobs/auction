// Local Modules
import {
  ProductsModel,
  FilesModel,
  OneTimeSalesModel,
  AuctionsModel,
  DiscountsModel,
  UsersModel,
  CategoriesModel,
  RelatedProductsModel, ProductLocationsModel, ShippingTemplatesModel, ProdShipTempModel
} from '../models';

import {
  CryptoUtil, DateFormatterUtil, ErrorsUtil, MediaUtil
} from '../utils';

import { SaleTypeEnum } from '../enum';
import PSQLStorage from '../storage/psql.storage';
import config from '../config/variables.config';
import fileTypeEnum from '../enum/fileType.enum';
import RegionsModel from '../models/regions.model';
import CitiesModel from '../models/cities.model';
import PostalCodesModel from '../models/postalCodes.model';

const { ConflictError } = ErrorsUtil;
const { DAY, STORAGE } = config;

export default class ProductsService {
  static async getCategories(search) {
    return CategoriesModel.getAllParents(search?.trim());
  }

  static async getCategoryByParentId(parentId) {
    return CategoriesModel.getByParentId(CryptoUtil.decryptByKey(parentId));
  }

  static async add(payload, files) {
    const trx = await PSQLStorage.knex.transaction();
    try {
      const { status, user_id, product, shipping } = payload;
      const {
        name, desc, category_id, sale_type, extra_data, auction, one_time_sale, discount, related_products
      } = product;

      const productPayload = {
        name, desc, category_id: CryptoUtil.decryptByKey(category_id), sale_type, extra_data, status
      };
      productPayload.creator_id = CryptoUtil.decryptByKey(user_id);

      const newProduct = await ProductsModel.create(trx, productPayload);

      if (files?.length > 0) await ProductsService.addFile(trx, files, newProduct?.id);

      if (sale_type === SaleTypeEnum.auction) await ProductsService.addAuction(trx, newProduct?.id, auction);

      if (sale_type === SaleTypeEnum.oneTimeSale) {
        const oneTimeSale = await ProductsService.addOneTimeSale(trx, newProduct?.id, one_time_sale);
        if (discount?.length > 0) {
          await ProductsService.addDiscount(trx, discount, oneTimeSale?.id);
        }
      }

      if (related_products?.length > 0) await ProductsService.addRelatedProducts(trx, related_products, newProduct.id);

      if (shipping?.seller_delivery && shipping?.shipping_templates) {
        const newTemplates = await ProductsService.addNewTemplates(trx, user_id, shipping);
        await ProductsService.addProdShipTemplate(trx, newProduct.id, newTemplates);
      }

      if (shipping?.shipping_template_ids) await ProductsService.joinTemplates(trx, newProduct.id, shipping.shipping_template_ids.ids);
      if (shipping) await ProductsService.addNewProductLocation(trx, newProduct.id, shipping);

      await trx.commit();
      return newProduct;
    } catch (error) {
      await trx.rollback();
      throw new ConflictError(error?.message);
    }
  }

  static async addAuction(trx, id, auction) {
    const auctionPayload = {
      product_id: id,
      start_time: DateFormatterUtil.formatDate(auction?.start_time),
      end_time: DateFormatterUtil.formatDate(Date.now() + (DAY * auction?.duration)),
      start_price: auction?.start_price,
      quantity: auction?.quantity,
      direct_sales_price: auction?.direct_sales_price,
      min_insured_price: auction?.min_insured_price,
      min_allowed_price: auction?.min_allowed_price,
      automatic_acceptance_price: auction?.automatic_acceptance_price,
    };
    return AuctionsModel.create(trx, auctionPayload);
  }

  static async addOneTimeSale(trx, id, one_time_sale) {
    try {
      const oneTimeSalePayload = {
        product_id: id,
        start_time: DateFormatterUtil.formatDate(one_time_sale?.start_time),
        start_price: one_time_sale?.start_price,
        quantity: one_time_sale?.quantity,
        min_allowed_price: one_time_sale?.min_allowed_price,
        automatic_acceptance_price: one_time_sale?.automatic_acceptance_price,
      };
      return OneTimeSalesModel.create(trx, oneTimeSalePayload);
    } catch (error) {
      throw new ConflictError(error?.message);
    }
  }

  static async addNewTemplates(trx, user_id, shipping) {
    try {
      if (shipping.shipping_templates?.length > 0) {
        const newTemplatesPayload = shipping.shipping_templates.map((template) => ({
          creator_id: CryptoUtil.decryptByKey(user_id),
          name: template.name,
          template: false,
          place_data: template.place_data,
          days: template.days,
          price: template.price,
        }));

        return ShippingTemplatesModel.addTemplate(trx, newTemplatesPayload);
      }
    } catch (error) {
      throw new ConflictError(error?.message);
    }
  }

  static async joinTemplates(trx, product_id, shipping_template_ids) {
    try {
      const joinTemplatesPayload = shipping_template_ids.map((id) => ({
        product_id,
        ship_template_id: CryptoUtil.decryptByKey(id),
      }));

      return ProdShipTempModel.create(trx, joinTemplatesPayload);
    } catch (error) {
      throw new ConflictError(error?.message);
    }
  }

  static async addProdShipTemplate(trx, product_id, newTemplates) {
    try {
      const newProdShipTempPayload = newTemplates.map((template) => ({
        product_id,
        ship_template_id: CryptoUtil.decryptByKey(template.id),
      }));

      return ProdShipTempModel.create(trx, newProdShipTempPayload);
    } catch (error) {
      throw new ConflictError(error?.message);
    }
  }

  static async addNewProductLocation(trx, product_id, shipping) {
    try {
      const newProductLocation = {
        product_id,
        can_be_approached: shipping?.can_be_approached,
        city_id: CryptoUtil.decryptByKey(shipping?.city_id),
        postal_code_id: CryptoUtil.decryptByKey(shipping?.postal_code_id),
        address: shipping?.address,
        preferred_days: JSON.stringify(shipping?.client_approach?.preferred_days),
        preferred_hours: JSON.stringify(shipping?.client_approach?.preferred_hours),
      };

      return ProductLocationsModel.create(trx, newProductLocation);
    } catch (error) {
      throw new ConflictError(error?.message);
    }
  }

  static addDiscount(trx, discount, id) {
    const discounts = discount.map((disc) => ({
      one_time_sale_id: id,
      quantity: disc.quantity,
      percent: disc.percent,
    }));

    return DiscountsModel.create(trx, discounts);
  }

  static addRelatedProducts(trx, related_products, id) {
    const rProducts = related_products.map((product) => ({
      parent_id: id,
      child_id: CryptoUtil.decryptByKey(product.child_id),
    }));

    return RelatedProductsModel.create(trx, rProducts);
  }

  static addFile(trx, files, id) {
    const allFiles = files.map((file) => ({
      resource_id: id,
      type: file.type,
      url: `.files/${file.type === fileTypeEnum.image ? STORAGE.IMAGE_ARCHIVE : STORAGE.VIDEO_ARCHIVE}/${file.originalname}`,
      module: 'product',
      name: file.originalname,
    }));
    return FilesModel.create(trx, allFiles);
  }

  static async allProducts(offset, search) {
    try {
      return ProductsModel.allProducts(offset, search);
    } catch (error) {
      throw new ConflictError(error?.message);
    }
  }

  static async getProductById(id) {
    try {
      return ProductsModel.getProductById(CryptoUtil.decryptByKey(id));
    } catch (error) {
      throw new ConflictError(error?.message);
    }
  }

  static async bulkDeleteProductsById(ids, userId) {
    try {
      const decryptedIds = ids.map((id) => CryptoUtil.decryptByKey(id));

      const myId = await UsersModel.myProductsUsers(CryptoUtil.decryptByKey(userId));
      const myProducts = await ProductsModel.getMyProductsById(decryptedIds, myId);
      const myProductsIds = myProducts.map((product) => CryptoUtil.decryptByKey(product.id));
      const myOneTimeSalesIds = await OneTimeSalesModel.getIds(myProductsIds);
      console.log(myOneTimeSalesIds);
      // TODO
      const discountsIds = await OneTimeSalesModel.bulkDeleteOneTimeSalesIds(myProductsIds);
      console.log(discountsIds);
      const deleted = await ProductsModel.bulkDeleteProductsById(myProductsIds);
      MediaUtil.deleteMedia(myProducts);

      return deleted;
    } catch (error) {
      console.log(error);
      throw new ConflictError(error?.message);
    }
  }

  static allRegionsFullData() {
    return RegionsModel.getFullData();
  }

  static allRegions() {
    return RegionsModel.list();
  }

  static async allCitiesByRegionId(region_id) {
    return CitiesModel.getFullDataByRegionId(CryptoUtil.decryptByKey(region_id));
  }

  static async allPostalCodesByCityId(city_id) {
    return PostalCodesModel.getFullDataByCityId(CryptoUtil.decryptByKey(city_id));
  }
}
