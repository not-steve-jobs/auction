// hooks
import { useContext } from "react";

// components
import AuthCodeVerification from "./AuthCodeVerification";

// store
import AuthContext from "../../context/auth-context";

const RecoverPasswordAuthCodeVerification = () => {
  const { onRecoverNextStep } = useContext(AuthContext);

  const recoverAuthenticationNextStepHandler = () => {
    onRecoverNextStep(4);
  };

  const chnageRecoverData = () => {
    onRecoverNextStep(1);
  };

  return (
    <AuthCodeVerification
      activateCodeURL={"recoverActivationCodeUrl"}
      resendURL={"recoverResendCodeUrl"}
      nextStepHandler={recoverAuthenticationNextStepHandler}
      changeClickHandler={chnageRecoverData}
    />
  );
};

export default RecoverPasswordAuthCodeVerification;
