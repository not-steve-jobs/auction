// plugins
import * as yup from "yup";

// error messages
import { INVALID_FORMAT, MESSAGE_REQUIRED } from "./constants/schema.constants";
import { EmailSchema, PhoneSchema } from "./reusable.schema";

export const signInSchema = yup.object().shape({
  password: yup.string().required(MESSAGE_REQUIRED.password),
  user_name: yup.string().required(MESSAGE_REQUIRED.user_name)
});

export const signUpSchema = yup.object().shape({
  full_name: yup
    .string()
    .min(3, INVALID_FORMAT.full_name_min_length)
    .required(MESSAGE_REQUIRED.full_name),
  registerBy: yup.string(),
  email: yup.string().when("registerBy", {
    is: "email",
    then: () => EmailSchema
  }),
  phone: yup.string().when("registerBy", {
    is: "phone",
    then: () => PhoneSchema
  })
});

export const recoverPasswordUsernameSchema = yup.object().shape({
  user_name: yup.string().required(MESSAGE_REQUIRED.user_name)
});

export { EmailSchema };
