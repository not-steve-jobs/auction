import { deleteData, getData, postData } from "./axios.service";

export const addProduct = async (data: object | string | null) => {
  return await postData(data, "addProduct");
};

export const getProducts = async () => {
  return await getData("allProducts");
};

export const addTemplate = async (data: object | string | null) => {
  return await postData(data, "addTemplate");
};

export const getProductById = async (id: string) => {
  return await getData("getProductById", id);
};

export const getCategories = async () => {
  return await getData("getCategories");
};

export const getCategoryById = async (id: string) => {
  return await getData("getCategoryById", id);
};

export const deleteProduct = async () => {
  return await deleteData("deleteProducts");
};
//get addresses

export const getFullRegions = async () => {
  return await getData("getFullRegions");
};

export const getRegions = async () => {
  return await getData("getRegions");
};

export const getCitiesByRegionId = async (id: string) => {
  return await getData("getCities", id);
};
export const getPostalCodeByCityId = async (id: any) => {
  return await getData("getPostalCodeByCityId", id);
};
export const getAllProducts = async () => {
  return await getData("getAllProducts");
};
