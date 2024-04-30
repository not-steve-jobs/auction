// NPM Modules
import Joi from 'joi';

// Local modules
import config from '../../../config/variables.config';

const { HASH_LENGTH } = config;

const number = Joi.number();
const positiveNumber = Joi.number().greater(0);
const ID = positiveNumber.integer();
const arrayID = Joi.array().items(ID);
const paramID = Joi.object({ id: ID.required() }).min(1).required();
const hashID = Joi.string().alphanum()?.length(HASH_LENGTH);
// fee: Joi.number().precision(2),

const Types = {
  ID, arrayID, paramID, positiveNumber, number, hashID
};
export default Types;
