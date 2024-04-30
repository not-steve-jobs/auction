import { JSX } from "react";

export interface IAuthSteps {
  [key: number]: JSX.Element;
}

export interface IPasswordValidationResult {
  hasNumber: boolean;
  isValidLength: boolean;
  hasUpperCaseLetter: boolean;
  hasLowerCaseLetter: boolean;
}

export interface IDebauncedResult {
  debaunced: boolean;
  isTheSame: boolean;
  repDebaunced: boolean;
  validationResult: IPasswordValidationResult;
}

export interface IAuthSignIn {
  full_name: string;
  password: string;
}

export interface IAuthSignUp {
  email?: string;
  phone?: string;
  full_name?: string;
}

export interface ISignUpJWT {
  email?: string;
  phone?: string;
  start_time: string;
  expiration_time: string;
  step: number;
  exp: number;
  iat: number;
}
