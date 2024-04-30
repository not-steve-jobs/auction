import { postData } from "./axios.service";

export const authPostData = async (data: object | string | null, url: string) => {
  const result = await postData(data, url);

  if (result.data.refresh_token) {
    localStorage.setItem("refresh_token", result.data.refresh_token);
  }
  localStorage.setItem("access_token", result.data.access_token);
};
