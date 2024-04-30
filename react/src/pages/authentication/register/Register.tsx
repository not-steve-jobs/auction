// hooks
import { useContext } from "react";

// store
import AuthContext from "../../../context/auth-context";

// components
import RegisterPasswordPart from "../../../components/auth/RegisterPasswordPart";
import RegisterWithEmailOrPhone from "../../../components/auth/RegisterWithEmailOrPhone";
import RegisterAuthCodeVerification from "../../../components/auth/RegisterAuthCodeVerification";

// interface
import { IAuthSteps } from "../../../interface/auth.interface";

function Register() {
  const { currentStep } = useContext(AuthContext);

  const STEPS: IAuthSteps = {
    [1]: <RegisterWithEmailOrPhone />,
    [2]: <RegisterAuthCodeVerification />,
    [3]: <RegisterPasswordPart passwordEndpoint={"createUserUrl"} />
  };

  return STEPS[currentStep];
}

export default Register;
