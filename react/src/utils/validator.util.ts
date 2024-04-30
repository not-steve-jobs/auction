import * as yup from "yup";

const options = { abortEarly: false };

const validateUtil = async (data: any, validationSchema: any) => {
  try {
    await validationSchema.validate(data, options);

    return { errors: {}, isValid: true };
  } catch (error: any) {
    const validationErrors: { [key: string]: string } = {};

    error.inner?.forEach((err: yup.ValidationError) => {
      if (!validationErrors[err.path as keyof yup.ValidationError]) {
        validationErrors[err.path as keyof yup.ValidationError] = err.message;
      }
    });

    return { errors: validationErrors, isValid: false };
  }
};

export default validateUtil;
