import jwt_decode from "jwt-decode";
import { IAuthJWT } from "../types/auth.types";

export const jwtDecode = (jwt: string) => {
  const decoded: IAuthJWT = jwt_decode(jwt);
  return decoded;
};
