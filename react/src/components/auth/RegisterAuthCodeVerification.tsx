// hooks
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// store
import AuthContext from "../../context/auth-context";

// components
import AuthCodeVerification from "./AuthCodeVerification";

const RegisterAuthCodeVerification = () => {
  const navigate = useNavigate();
  const { onNextStep, setSignupPhoneOrEmailStep } = useContext(AuthContext);

  const authNextStepHandler = () => {
    onNextStep(3, {});
  };

  const handleAuthChangeClickHandler = () => {
    setSignupPhoneOrEmailStep(2);
    navigate("/auth/change");
  };

  return (
    <AuthCodeVerification
      activateCodeURL={"activationCodeUrl"}
      resendURL={"resendCodeUrl"}
      nextStepHandler={authNextStepHandler}
      changeClickHandler={handleAuthChangeClickHandler}
    />
  );
};

export default RegisterAuthCodeVerification;
