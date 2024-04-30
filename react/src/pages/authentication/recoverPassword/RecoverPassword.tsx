// hooks
import { useContext } from "react";

// store
import AuthContext from "../../../context/auth-context";

// components
import RecoverPasswordWriteUsername from "../../../components/auth/RecoverPasswordWriteUsername";
import RecoverModeSelector from "../../../components/auth/RecoverModeSelector";
import RegisterPasswordPart from "../../../components/auth/RegisterPasswordPart";
import RecoverPasswordAuthCodeVerification from "../../../components/auth/RecoverPasswordAuthCodeVerification";

// interface
import { IAuthSteps } from "../../../interface/auth.interface";

const RecoverPassword = () => {
  const { recoverStep } = useContext(AuthContext);

  const STEPS: IAuthSteps = {
    [1]: <RecoverPasswordWriteUsername />,
    [2]: <RecoverModeSelector />,
    [3]: <RecoverPasswordAuthCodeVerification />,
    [4]: <RegisterPasswordPart passwordEndpoint={"recoverConfirmPasswordUrl"} />
  };

  return STEPS[recoverStep];
};
export default RecoverPassword;
