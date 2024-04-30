// hooks
import { useContext } from "react";

// components
import Button from "../shared/Button";
import AuthTopLogo from "./AuthTopLogo";

// libs
import { NavLink } from "react-router-dom";

// store
import AuthContext from "../../context/auth-context";

// constants
import constants from "./constants";

const { ENABLED_BUTTON } = constants;
const RegisterChangePhoneOrEmail = () => {
  const { registrationData, setSignupPhoneOrEmailStep } = useContext(AuthContext);

  const handleChangeButtonClick = () => {
    setSignupPhoneOrEmailStep(2);
  };

  return (
    <>
      <AuthTopLogo>Գրանցում</AuthTopLogo>
      <div
        className={
          "font-mardoto text-[14px] leading-normal font-regular text-[#101B28CC] text-center mt-[70px] mb-[60px]"
        }>
        <span className={"font-medium"}>
          {registrationData.byPhone ? registrationData.phone : registrationData.email}
        </span>
        {registrationData.byPhone ? " հեռախոսահամարով" : " էլ. հասցեով"} գրանցված հաշիվ արդեն
        գոյություն ունի
      </div>
      <div>
        <NavLink to={"/auth/sign-in"}>
          <Button className={`${ENABLED_BUTTON} w-full rounded-[1000px] mb-[20px]`}>
            Մուտք գործել
          </Button>
        </NavLink>

        <Button
          onClick={handleChangeButtonClick}
          className={`${ENABLED_BUTTON} bg-[#F0F3FF] !text-[#144272] w-full rounded-[1000px] mb-[20px]`}>
          Փոփոխել {registrationData.byPhone ? " հեռախոսահամարը" : " էլ. հասցեն"}
        </Button>
      </div>
    </>
  );
};

export default RegisterChangePhoneOrEmail;
