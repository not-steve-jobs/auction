import { getData, postData } from "./axios.service";

export const addService = async (data: object | string | null) => {
  return await postData(data, "addService");
};

export const getServiceCategories = async () => {
  try {
    const res = await getData("getServiceCategories");

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getMyServices = async (query?: { status: string }) => {
  try {
    const res = await getData("getMyServices", undefined, query);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const addPortfolio = async (data: any) => {
  try {
    const res = await postData(data, "addServicePortfolio");

    const multimedia = res.data.newFiles[0]?.name;
    const portfolio = res.data.newPortfolio;

    return { ...portfolio, multimedia };
  } catch (err) {
    return err;
  }
};

export const createService = async (data: any) => {
  return await postData(data, "createService");
};
