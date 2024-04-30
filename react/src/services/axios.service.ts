import axios from "axios";

interface IEndpoint {
  // eslint-disable-next-line no-unused-vars
  [key: string]: string | ((id: string) => string);
}

const endpoints: IEndpoint = {
  signUpUrl: "/auth/signUp",
  signInUrl: "/auth/login",
  activationCodeUrl: "/auth/code",
  resendCodeUrl: "/auth/resend",
  createUserUrl: "/auth/pass",
  recoverConfirmPasswordUrl: "/auth/recovery/pass",
  recoverCheckUserUrl: "/auth/recovery/checkUser",
  getRecoverVerificationCodeUrl: "/auth/recovery/notification",
  recoverActivationCodeUrl: "/auth/recovery/code",
  recoverResendCodeUrl: "/auth/recovery/resend",
  googleAuthUrl: "auth/google/signup",
  facebookAuthUrl: "auth/facebook/signup",
  addProduct: `/products`,
  addTemplate: `/products/shipping/addTemplate`,
  allProducts: `/products/list`,
  getProductById: (id) => `/products/${id}`,
  getCategories: `/products/categories`,
  getCategoryById: (id) => `/product/${id}`,
  deleteProducts: `/products/delete`,
  getServiceCategories: `/services/categories`,
  getMyServices: `/services/getMyServices`,
  addServicePortfolio: `/services/portfolio`,
  createService: `/services`,
  getFullRegions: "/products/regions/full",
  getRegions: "/products/regions",
  getCities: (region_id) => `/products/cities/${region_id}`,
  getPostalCodeByCityId: (city_id) => `/products/postalCodes/${city_id}`,
  getAllProducts: "/products/list"
};

export const postData = (data: object | string | null, urlKey: string) => {
  return axios.post(endpoints[urlKey] as string, data);
};

export const getData = (urlKey: string, param?: string, query?: { [key: string]: string }) => {
  if (param) {
    const urlFunc = endpoints[urlKey] as Function;
    return query ? axios.get(urlFunc(param), { params: query }) : axios.get(urlFunc(param));
  } else {
    return query
      ? axios.get(endpoints[urlKey] as string, { params: query })
      : axios.get(endpoints[urlKey] as string);
  }
};

export const deleteData = (urlKey: string) => {
  return axios.delete(endpoints[urlKey] as string);
};
