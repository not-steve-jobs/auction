import axios from "axios";

import { getLocalStoreItem } from "../utils/storage.util";
// eslint-disable-next-line no-undef
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

axios.interceptors.request.use(
  // onFulfilled
  (config) => {
    const token = getLocalStoreItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${getLocalStoreItem("access_token")}`;
    }

    return config;
  },
  // onRejected
  (error) => {
    return Promise.reject(error);
  }
);
