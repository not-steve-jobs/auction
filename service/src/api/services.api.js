// NPM Modules
import express from 'express';
import multer from 'multer';

// Local Modules
import { ServicesController } from '../controller';
import { ServicesValidationMiddleware } from '../middlewares/validation';
import { ImageUploadMiddleware } from '../middlewares/imageUpload.middleware';
import AuthMiddleware from '../../auth/auth.middleware';

const router = express.Router();
const upload = multer();

router.get('/categories',
  AuthMiddleware.authenticate(),
  ServicesController.getAllCategories);

router.get('/getMyServices',
  AuthMiddleware.authenticate(),
  ServicesValidationMiddleware.validateGetMyServicesArgs,
  ServicesController.getMyServices);

router.get('/getAllServices',
  AuthMiddleware.authenticate(),
  ServicesValidationMiddleware.validateGetAllServicesArgs,
  ServicesController.getAllServices);

router.get('/getMyPortfolios',
  AuthMiddleware.authenticate(),
  ServicesController.getMyPortfolios);

router.get('/category/:parent_id',
  AuthMiddleware.authenticate(),
  ServicesValidationMiddleware.validateGetCategoryArgs,
  ServicesController.getCategoryByParentId);

router.get('/mainCategoryPath/:last_category_id',
  AuthMiddleware.authenticate(),
  ServicesValidationMiddleware.validateGetMainCategoryPathArgs,
  ServicesController.getMainCategoryPathByLastCategoryId);

router.post('/',
  AuthMiddleware.authenticate(),
  upload.any(),
  ServicesValidationMiddleware.validateAddArgs,
  ImageUploadMiddleware.uploadImages,
  ImageUploadMiddleware.uploadVideo,
  ServicesController.add);

router.post('/portfolio',
  AuthMiddleware.authenticate(),
  upload.any(),
  ServicesValidationMiddleware.validateAddPortfolioArgs,
  ImageUploadMiddleware.uploadImages,
  ImageUploadMiddleware.uploadVideo,
  ServicesController.addPortfolio);

// router.get('/list/:search?',
//   ServicesController.allProducts);

// router.delete('/delete',
//   AuthMiddleware.authenticate(),
//   ProductsValidationMiddleware.validateDeleteByIdsArgs,
//   ServicesController.bulkDeleteProductsById);

// router.get('/:id',
//   ProductsValidationMiddleware.validateGetByIdArgs,
//   ServicesController.getProductById);

export default router;
