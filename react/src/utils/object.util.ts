// @ts-ignore
export const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;

export const clearUndefinedValuesFromObject = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};

export const objectToFormData = (
  object: Record<string, any>,
  formData: FormData = new FormData(),
  parentKey: string = ""
): FormData => {
  for (const key in object) {
    // eslint-disable-next-line no-prototype-builtins
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (typeof value === "object" && !Array.isArray(value) && !(value instanceof File)) {
        if (Object.keys(value).length > 0) {
          objectToFormData(value, formData, formKey);
        } else {
          formData.append(formKey, ""); // Append an empty value if the object is empty
        }
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          value.forEach((item, index) => {
            if (typeof item === "object" && !Array.isArray(item) && !(item instanceof File)) {
              objectToFormData(item, formData, `${formKey}[${index}]`);
            } else {
              formData.append(`${formKey}[${index}]`, item);
            }
          });
        }
      } else if (value instanceof File) {
        formData.append(formKey, value);
      } else {
        formData.append(formKey, value);
      }
    }
  }
  return formData;
};
