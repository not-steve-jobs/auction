import * as yup from "yup";
import { INVALID_FORMAT, MESSAGE_REQUIRED } from "./constants/schema.constants";
import phone from "phone";

export const PhoneSchema = yup
  .string()
  .required(MESSAGE_REQUIRED.phone)
  .test("is-valid-phone", INVALID_FORMAT.phone_format, (value: string) => {
    const { isValid } = phone(value);
    return isValid;
  });

export const EmailSchema = yup
  .string()
  .email(INVALID_FORMAT.email_format)
  .min(3, INVALID_FORMAT.email_format)
  .required(MESSAGE_REQUIRED.email);
