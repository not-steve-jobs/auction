// NPM Modules
import express from 'express';

// Local Modules
import { AuthController } from '../controller';
import { AuthValidationMiddleware } from '../middlewares/validation';
import AuthMiddleware from '../auth/auth.middleware';

const router = express.Router();

// Step 1 for auth
router.post('/signUp',
  AuthValidationMiddleware.validateSignUpArgs,
  AuthController.signUp);

// Step 2 for auth
router.post('/code',
  AuthMiddleware.authenticateForRegistration(),
  AuthValidationMiddleware.validateActivationCodeArgs,
  AuthController.checkVerificationCode);

// Step 3 for auth
router.post('/pass',
  AuthMiddleware.authenticateForRegistration(),
  AuthValidationMiddleware.validatePasswordArgs,
  AuthController.createUser);

router.post('/resend',
  AuthMiddleware.authenticateForRegistration(),
  AuthController.resend);

router.post('/login',
  AuthValidationMiddleware.validateLoginArgs,
  AuthController.login);

router.post('/refresh',
  AuthController.refresh);

router.post('/recovery/checkUser',
  AuthValidationMiddleware.validateCheckUserArgs,
  AuthController.checkUser);

router.post('/recovery/notification',
  AuthMiddleware.authenticateForRegistration(),
  AuthValidationMiddleware.validateEmailOrPhoneArgs,
  AuthController.notification);

router.post('/recovery/code',
  AuthMiddleware.authenticateForRegistration(),
  AuthValidationMiddleware.validateActivationCodeArgs,
  AuthController.checkVerificationCodeForRecovery);

router.post('/recovery/resend',
  AuthMiddleware.authenticateForRegistration(),
  AuthController.recoveryResend);

router.post('/recovery/pass',
  AuthMiddleware.authenticateForRegistration(),
  AuthValidationMiddleware.validateRecoveryPasswordArgs,
  AuthController.passwordRecovery);

router.post('/google/signUp',
  AuthMiddleware.authenticateForGoogleId(),
  AuthValidationMiddleware.validateGoogleLogin,
  AuthController.googleSignUp);

router.post('/facebook/signUp',
  AuthMiddleware.authenticateForFacebookId(),
  AuthValidationMiddleware.validateFacebookLogin,
  AuthController.facebookSignUp);

export default router;
