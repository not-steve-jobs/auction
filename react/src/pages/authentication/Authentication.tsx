import { NavLink } from "react-router-dom";

function Authentication() {
  return (
    <div>
      Authentication Main
      <NavLink to="sign-in">Sign in</NavLink>
      <NavLink to="auth">Register</NavLink>
    </div>
  );
}

export default Authentication;
