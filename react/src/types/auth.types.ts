import { IAuthSignIn, IAuthSignUp, ISignUpJWT } from "../interface/auth.interface";

export type AuthType = IAuthSignUp | IAuthSignIn;

export type IAuthJWT = ISignUpJWT;
