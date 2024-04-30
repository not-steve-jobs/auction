import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { authPostData } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";

const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const handleLoginError = () => {
    console.log("error");
  };

  const handleLoginSuccess = async (token: TokenResponse) => {
    const { access_token: google_token } = token;

    try {
      const payload = { google_token };

      await authPostData(payload, "googleAuthUrl");

      onLogin();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const googleLogin = useGoogleLogin({
    onError: handleLoginError,
    onSuccess: handleLoginSuccess
  });

  const handleLogin = () => googleLogin();

  return { handleLogin };
};

export default useGoogleAuth;
