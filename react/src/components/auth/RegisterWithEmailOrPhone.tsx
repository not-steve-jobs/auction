// hooks
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import AuthForm from "./AuthForm";
import FormTopLogo from "./AuthTopLogo";
import MediaRegistration from "./MediaRegistration";

// store
import AuthContext from "../../context/auth-context";

// services
import { authPostData } from "../../services/auth.service";

// interface
import { IAuthSignUp } from "../../interface/auth.interface";

// utils
import validateUtil from "../../utils/validator.util";

// schema
import { signUpSchema } from "../../schemas/auth.schema";

const RegisterWithEmailOrPhone = () => {
  const navigate = useNavigate();
  const { registrationData, onNextStep, setSignupPhoneOrEmailStep } = useContext(AuthContext);
  const [signUpErrors, setSignUpErrors] = useState({});

  useEffect(() => {
    setSignUpErrors({});
  }, [registrationData.byPhone]);

  const handleAuthFormSubmitAction = async (data: IAuthSignUp) => {
    const validateData = { ...data, registerBy: registrationData.byPhone ? "phone" : "email" };
    const { isValid, errors } = await validateUtil(validateData, signUpSchema);

    setSignUpErrors(errors);

    if (!isValid) return;

    try {
      await authPostData(data, "signUpUrl");
      onNextStep(2, data);
    } catch (err: any) {
      if (err.response.status === 409) {
        onNextStep(1, data);
        setSignupPhoneOrEmailStep(1);
        navigate("/auth/change");
      }
    }
  };

  return (
    <>
      <FormTopLogo>Գրանցում</FormTopLogo>
      <AuthForm
        errors={signUpErrors}
        setErrors={setSignUpErrors}
        byEmail={registrationData.byEmail}
        byPhone={registrationData.byPhone}
        handleFormSubmit={handleAuthFormSubmitAction}
      />
      <MediaRegistration suggestionText="Կամ գրանցվեք" />
    </>
  );
};

export default RegisterWithEmailOrPhone;
