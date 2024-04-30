import { useContext } from "react";
import authContext from "../context/auth-context";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }: any) => {
  const { isLoggedIn } = useContext(authContext);
  let location = useLocation();

  if (isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default AuthGuard;
