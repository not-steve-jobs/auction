// NPM Modules
import express from 'express';
import multer from 'multer';

// Local Modules
import { ProductsController, ShippingController } from '../controller';
import { ProductsValidationMiddleware, ShippingValidationMiddleware } from '../middlewares/validation';
import { ImageUploadMiddleware } from '../middlewares/imageUpload.middleware';
import AuthMiddleware from '../../auth/auth.middleware';

const router = express.Router();
const upload = multer();

router.get('/regions/full',
  ProductsController.allRegionsFullData);

router.get('/regions',
  ProductsController.allRegions);

router.get('/cities/:region_id',
  ProductsValidationMiddleware.validateGetCitiesByRegionIdArgs,
  ProductsController.allCitiesByRegionId);

router.get('/postalCodes/:city_id',
  ProductsValidationMiddleware.validateGetPostalCodesByCityIdArgs,
  ProductsController.allPostalCodesByCityId);

router.get('/categories',
  ProductsValidationMiddleware.validateGetCategoriesArgs,
  ProductsController.getCategories);

router.get('/category/:parent_id',
  ProductsValidationMiddleware.validateGetCategoryArgs,
  ProductsController.getCategoryByParentId);

router.post('/',
  AuthMiddleware.authenticate(),
  upload.any(),
  ProductsValidationMiddleware.validateAddArgs,
  ImageUploadMiddleware.uploadImages,
  ImageUploadMiddleware.uploadVideo,
  ProductsController.add);

router.get('/list/:search?',
  ProductsController.allProducts);

router.delete('/delete',
  AuthMiddleware.authenticate(),
  ProductsValidationMiddleware.validateDeleteByIdsArgs,
  ProductsController.bulkDeleteProductsById);

router.get('/:id',
  ProductsValidationMiddleware.validateGetByIdArgs,
  ProductsController.getProductById);

router.post('/shipping/addTemplate',
  AuthMiddleware.authenticate(),
  ShippingValidationMiddleware.validateAddShippingTemplateArgs,
  ShippingController.addShippingTemplate);

router.get('/shipping/templates',
  AuthMiddleware.authenticate(),
  ShippingValidationMiddleware.validateGetAllArgs,
  ShippingController.allTemplates);

router.get('/shipping/templateById/:id',
  AuthMiddleware.authenticate(),
  ShippingValidationMiddleware.validateGetByIdArgs,
  ShippingController.getTemplateById);

export default router;
