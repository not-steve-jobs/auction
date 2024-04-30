import { useEffect, useState } from "react";
import { IPasswordValidationResult } from "../interface/auth.interface";

export const usePasswordValidation = (
  password: string,
  repeatPassword: string,
  duration: number
) => {
  const [validationResult, setValidationResult] = useState<IPasswordValidationResult>({
    hasNumber: false,
    isValidLength: false,
    hasLowerCaseLetter: false,
    hasUpperCaseLetter: false
  });
  const [debaunced, setDebaunced] = useState<boolean>(false);
  const [isTheSame, setIsTheSame] = useState<boolean>(false);
  const [repDebaunced, setRepDebaunced] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValidationResult({
        ...validationResult,
        hasNumber: /[0-9]/.test(password),
        isValidLength: password.length >= 8,
        hasLowerCaseLetter: /[a-z]/.test(password),
        hasUpperCaseLetter: /[A-Z]/.test(password)
      });
      setDebaunced(password.length !== 0);
      setIsTheSame(password === repeatPassword);
      setRepDebaunced(password.length !== 0 && repeatPassword.length !== 0);
    }, duration);

    return () => clearTimeout(handler);
  }, [password, repeatPassword, duration]);

  return { debaunced, isTheSame, repDebaunced, validationResult };
};
