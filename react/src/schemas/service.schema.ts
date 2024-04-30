import * as yup from "yup";
import phone from "phone";

export const PhoneSchema = yup
  .string()
  // @ts-ignore
  .test("is-valid-phone", "INVALID_FORMAT", (value: string) => {
    const { isValid } = phone(value);
    return isValid;
  });

const emailSchema = yup.string().email("Invalid email address").required("daskjdhajsd");
const linksSchema = yup.object().shape({
  name: yup.string(),
  url: yup.string().url("Invalid URL").required("daskjdhajsd")
});

const serviceContactsSchema = yup.object().shape({
  contact_person: yup.string().required("Mandatory field"),
  phones: yup.array().of(PhoneSchema).min(1, "At least one phone number is required"),
  emails: yup.array().of(emailSchema),
  links: yup.array().of(linksSchema)
});

export const createServiceSchema = yup.object().shape({
  contacts: serviceContactsSchema,
  description: yup.string().required("Mandatory field"),
  category_id: yup.string().required("Mandatory field"),
  status: yup.string().required("Mandatory field")
});
