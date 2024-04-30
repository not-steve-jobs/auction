// NPM Modules

// Local Modules
import { AuthSchemes } from './schemes';
import ValidatorUtil from './util/validator.util';

class AuthValidation {
  static validateSignUpArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.signUpSchema, next);
  }

  static validateActivationCodeArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.activationCodeSchema, next);
  }

  static validatePasswordArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.passwordSchema, next);
  }

  static validateLoginArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.logInSchema, next);
  }

  static validateCheckUserArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.checkUserSchema, next);
  }

  static validateEmailOrPhoneArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.emailOrPhoneSchema, next);
  }

  static validateRecoveryPasswordArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.recoveryPasswordSchema, next);
  }

  static validateGoogleLogin(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.validateGoogleLogin, next);
  }

  static validateFacebookLogin(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.validateFacebookLogin, next);
  }
}

export default AuthValidation;
