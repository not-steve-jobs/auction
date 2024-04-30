import { useContext, useState } from "react";

import AuthContext from "../../../context/auth-context";
import validateUtil from "../../../utils/validator.util";
import AuthForm from "../../../components/auth/AuthForm";
import AuthTopLogo from "../../../components/auth/AuthTopLogo";
import MediaRegistration from "../../../components/auth/MediaRegistration";

import { AuthType } from "../../../types/auth.types";
import { signInSchema } from "../../../schemas/auth.schema";
import { authPostData } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { registrationData, onLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [signInErrors, setSignInErrors] = useState<object>({});

  const handleSignIn = async (data: AuthType) => {
    const { isValid, errors } = await validateUtil(data, signInSchema);

    setSignInErrors(errors);

    if (!isValid) return;

    try {
      await authPostData(data, "signInUrl");
      onLogin();
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      setSignInErrors({ universalError: "Տվյալները սխալ են լրացված" });
    }
  };

  return (
    <div>
      <AuthTopLogo>Մուտք</AuthTopLogo>
      <AuthForm
        byEmail={registrationData.byEmail}
        byPhone={registrationData.byPhone}
        errors={signInErrors}
        setErrors={setSignInErrors}
        handleFormSubmit={handleSignIn}
      />
      <MediaRegistration suggestionText="Կամ մուտք գործեք" />
    </div>
  );
}

export default SignIn;
