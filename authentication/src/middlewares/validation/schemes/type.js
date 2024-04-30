// NPM Modules
import Joi from 'joi';

// Local Modules

export const positiveNumber = Joi.number().min(1);
export const ID = positiveNumber.integer();
