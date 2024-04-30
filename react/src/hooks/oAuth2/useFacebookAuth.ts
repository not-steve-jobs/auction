import { useFacebookLogin } from "facebook-oauth-react";
import { authPostData } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";

const useFacebookAuth = () => {
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const handleLoginError = () => {
    console.log("error");
  };

  const handleLoginSuccess = async (authResponse: any) => {
    const { accessToken: facebook_token } = authResponse;
    try {
      const payload = { facebook_token };

      await authPostData(payload, "facebookAuthUrl");

      onLogin();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const facebookLogin = useFacebookLogin({
    onError: handleLoginError,
    onSuccess: handleLoginSuccess
  });

  const handleLogin = () => facebookLogin({ scope: "email" });

  return { handleLogin };
};

export default useFacebookAuth;
