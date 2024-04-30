// NPM modules
import Joi from 'joi';

// Local Modules
import config from '../../../config/variables.config';

const { VERIFICATION_CODE } = config;

const AuthSchema = {
  signUpSchema: {
    body: Joi.object({
      full_name: Joi.string().min(3).max(255).required(),
      email: Joi.string().email().messages({
        'string.email': 'Invalid email address',
      }),
      phone: Joi.string()
        .pattern(/^\+\d+$/)
        .max(12)
    }).xor('email', 'phone').required()
  },
  activationCodeSchema: {
    body: Joi.object({
      verification_code: Joi.string().length(Number(VERIFICATION_CODE.LENGTH))
        .message('').required()
    })
  },
  passwordSchema: {
    body: Joi.object({
      password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$'))
      // TODO now
        .message('The password must contain at least one uppercase letter, one lowercase letter and one number.!')
        .required(),
      repeat_password: Joi.ref('password') // Ensure repeat_password matches password
    }).with('password', 'repeat_password')
  },
  logInSchema: {
    body: Joi.object({
      user_name: Joi.string().min(1).max(255).required(),
      password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$'))
      // TODO now
        .message('Not valid password')
        .required(),
    })
  },
  checkUserSchema: {
    body: Joi.object({
      user_name: Joi.string().min(3).max(255).required()
    })
  },
  emailOrPhoneSchema: {
    body: Joi.object({
      email: Joi.string().email().messages({
        'string.email': 'Invalid email address',
      }),
      phone: Joi.string()
        .pattern(/^\+\d+$/)
        .max(12)
    }).xor('email', 'phone').required()
  },
  recoveryPasswordSchema: {
    body: Joi.object({
      password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$'))
        // TODO now
        .message('The password must contain at least one uppercase letter, one lowercase letter and one number.!')
        .required(),
      repeat_password: Joi.ref('password') // Ensure repeat_password matches password
    }).with('password', 'repeat_password')
  },
  validateGoogleLogin: {
    body: Joi.object({
      google_token: Joi.string().min(1).max(255).required()
    })
  },
  validateFacebookLogin: {
    body: Joi.object({
      facebook_token: Joi.string().min(1).max(255).required()
    })
  }
};

export default AuthSchema;
