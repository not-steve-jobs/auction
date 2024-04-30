/* eslint-disable no-return-await */
// Local Modules
import {
  CategoriesModel, ContactsModel, FilesModel, PortfoliosModel, ServicesModel
} from '../models';

import { CryptoUtil, ErrorsUtil } from '../utils';

import PSQLStorage from '../storage/psql.storage';

import { ModuleEnum } from '../enum';
import ServiceCategoriesModel from '../models/serviceCategories.model';

const { ConflictError } = ErrorsUtil;

export default class ServicesService {
  static async getAllCategories(status) {
    return CategoriesModel.getAllParents(status);
  }

  static async getMyServices(user_id, status) {
    try {
      user_id = CryptoUtil.decryptByKey(user_id);
      const categories = await ServiceCategoriesModel.getServicesByUserId(user_id, status);
      return this.findServiceQueryHelper(categories);
    } catch (error) {
      throw new ConflictError(error?.message);
    }
  }

  static async getAllServices(status) {
    try {
      const categories = await ServiceCategoriesModel.getAllServices(status);
      return this.findServiceQueryHelper(categories);
    } catch (error) {
      throw new ConflictError(error?.message);
    }
  }

  static async findServiceQueryHelper(categories) {
    return await Promise.all(categories?.map(async (category) => {
      const services = await Promise.all(category?.child_cat_id?.map(async (id, index) => {
        const file = await FilesModel.getByResourseId(category?.service_id[index]);

        return {
          id: CryptoUtil.encryptByKey(id),
          name: category?.child_cat_name[index],
          service_id: CryptoUtil.encryptByKey(category?.service_id[index]),
          service_desc: category?.service_desc[index],
          status: category?.service_status[index],
          contact_person: category?.service_contact_person[index],
          phones: category?.service_contact_phones[index],
          emails: category?.service_contact_emails[index],
          links: category?.service_contact_links[index],
          files: file
        };
      }));
      return {
        name: category?.parent_cat_name ?? null,
        category_id: category.parent_cat_id ? CryptoUtil.encryptByKey(category.parent_cat_id) : null,
        services
      };
    }));
  }

  static getMyPortfolios(user_id) {
    return ServicesModel.getMyPortfolios(CryptoUtil.decryptByKey(user_id));
  }

  static async getMainCategoryPathByLastCategoryId(parentId) {
    return CategoriesModel.getMainByChildId(CryptoUtil.decryptByKey(parentId));
  }

  static async getCategoryByParentId(parentId) {
    return CategoriesModel.getParentByChildId(CryptoUtil.decryptByKey(parentId));
  }

  static async add(payload, files) {
    const transaction = await PSQLStorage.knex.transaction();

    try {
      const {
        name, description, category_id, user_id, extra_data, status, contacts, portfolioIds
      } = payload;

      const servicePayload = {
        name,
        description,
        category_id: CryptoUtil.decryptByKey(category_id),
        extra_data,
        status,
        creator_id: CryptoUtil.decryptByKey(user_id)
      };

      if (portfolioIds) {
        servicePayload.portfolioIds = JSON.stringify(portfolioIds.map((item) => CryptoUtil.decryptByKey(item)));
      }
      const newService = await ServicesModel.create(transaction, servicePayload);

      if (files?.length > 0) {
        await ServicesService.addFile(transaction, files, CryptoUtil.decryptByKey(newService?.id), ModuleEnum.service);
      }

      if (contacts) {
        contacts.service_id = CryptoUtil.decryptByKey(newService?.id);
        contacts.phones = JSON.stringify(contacts?.phones);
        if (contacts.links) contacts.links = JSON.stringify(contacts?.links);

        if (contacts.emails) contacts.emails = JSON.stringify(contacts?.emails);

        await ContactsModel.create(transaction, contacts);
      }

      newService.portfolioIds = portfolioIds;
      await transaction.commit();

      return newService;
    } catch (error) {
      await transaction.rollback();
      throw new ConflictError(error?.message);
    }
  }

  static async addPortfolio(payload, files) {
    const transaction = await PSQLStorage.knex.transaction();

    try {
      const newPortfolio = await PortfoliosModel.create(transaction, payload);

      let newFiles;
      if (files?.length > 0) {
        newFiles = await ServicesService.addFile(transaction, files, CryptoUtil.decryptByKey(newPortfolio?.id), ModuleEnum.portfolio);
      }
      await transaction.commit();

      return { newPortfolio, newFiles };
    } catch (error) {
      await transaction.rollback();
      throw new ConflictError(error?.message);
    }
  }

  static addFile(trx, files, id, module) {
    const allFiles = files?.map((file) => ({
      resource_id: id, type: file.type, url: 'testUrl', module, name: file.originalname
    }));

    return FilesModel.create(trx, allFiles);
  }
}
