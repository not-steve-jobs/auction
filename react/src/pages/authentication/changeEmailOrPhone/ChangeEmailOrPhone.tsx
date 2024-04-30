// hooks
import { useContext } from "react";

// store
import AuthContext from "../../../context/auth-context";

// components
import RegisterChangePhoneOrEmail from "../../../components/auth/RegisterChangePhoneOrEmail";
import WriteChangedPhoneOrEmail from "../../../components/auth/WriteChangedPhoneOrEmail";

// interfaces
import { IAuthSteps } from "../../../interface/auth.interface";

const ChangeEmailOrPhone = () => {
  const { signupPhoneOrEmailStep } = useContext(AuthContext);

  const STEPS: IAuthSteps = {
    [1]: <RegisterChangePhoneOrEmail />,
    [2]: <WriteChangedPhoneOrEmail />
  };

  return STEPS[signupPhoneOrEmailStep];
};

export default ChangeEmailOrPhone;
