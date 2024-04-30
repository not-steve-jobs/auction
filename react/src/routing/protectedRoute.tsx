import { useContext } from "react";
import authContext from "../context/auth-context";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { isLoggedIn } = useContext(authContext);
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
