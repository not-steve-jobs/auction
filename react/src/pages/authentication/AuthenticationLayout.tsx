// libs
import { Outlet } from "react-router-dom";

// providers
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookOAuthProvider } from "facebook-oauth-react";

// components
import AuthWrapper from "../../components/auth/AuthWrapper";

// constants
import constants from "../../components/auth/constants";

const { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID, FACEBOOK_APP_VERSION } = constants;

function AuthenticationLayout() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <FacebookOAuthProvider appId={FACEBOOK_APP_ID} appVersion={FACEBOOK_APP_VERSION}>
        <AuthWrapper>
          <Outlet />
        </AuthWrapper>
      </FacebookOAuthProvider>
    </GoogleOAuthProvider>
  );
}

export default AuthenticationLayout;
