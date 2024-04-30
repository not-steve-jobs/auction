import React, { Context, useState } from "react";
import { getLocalStoreItem } from "../utils/storage.util";

const AuthContext: Context<any> = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
  // eslint-disable-next-line no-unused-vars
  onNextStep: (step: number, data: any) => {},
  // eslint-disable-next-line no-unused-vars
  onRecoverNextStep: (step: number) => {},
  // eslint-disable-next-line no-unused-vars
  setSignupPhoneOrEmailStep: (step: number) => {},
  // eslint-disable-next-line no-unused-vars
  toExitedDataStep: (data: number) => {},
  // eslint-disable-next-line no-unused-vars
  comeToFirstStep: () => {},
  // eslint-disable-next-line no-unused-vars
  onRegistrationDataChange: (data: any) => {},
  currentStep: 1,
  recoverStep: 1,
  signupPhoneOrEmailStep: 1,
  registrationData: {
    byPhone: false,
    byEmail: false
  }
});

export const AuthContextProvider = (props: any) => {
  const refresh_token = getLocalStoreItem("refresh_token");

  const [currentStep, setCurrentStep] = useState(1);
  const [recoverStep, setRecoverStep] = useState(1);
  const [signupPhoneOrEmailStep, setSignupPhoneOrEmailStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(!!refresh_token);

  const [registrationData, setRegistrationData] = useState<any>({
    byPhone: false,
    byEmail: true
  });

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const nextStepHandler = (step: number, data: any) => {
    setCurrentStep(step);
    handleRegistrationData(data);
  };

  const recoverNextStepHandler = (step: number) => {
    setRecoverStep(step);
  };

  const toExitedDataStep = (data: object) => {
    setCurrentStep(1.2);
    setRegistrationData({ ...registrationData, ...data });
  };

  const comeToFirstStep = () => {
    setCurrentStep(1);
  };

  const handleRegistrationData = (data: object) => {
    setRegistrationData({ ...registrationData, ...data });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        currentStep: currentStep,
        recoverStep: recoverStep,
        signupPhoneOrEmailStep: signupPhoneOrEmailStep,
        onNextStep: nextStepHandler,
        onRecoverNextStep: recoverNextStepHandler,
        setSignupPhoneOrEmailStep: setSignupPhoneOrEmailStep,
        toExitedDataStep: toExitedDataStep,
        comeToFirstStep: comeToFirstStep,
        registrationData: registrationData,
        onRegistrationDataChange: handleRegistrationData
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
