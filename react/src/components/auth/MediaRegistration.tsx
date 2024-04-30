import classNames from "classnames";

import { useNavigate } from "react-router-dom";
import { FC, useState, useContext } from "react";

import constants from "./constants";

import Button from "../shared/Button";

import AuthContext from "../../context/auth-context";
import useLocationEnhancer from "../../hooks/useLocationEnhancer";
import useFacebookAuth from "../../hooks/oAuth2/useFacebookAuth";
import useGoogleAuth from "../../hooks/oAuth2/useGoogleAuth";

const { COMMON_REGISTRATION_BUTTONS, MEDIA_REGISTRATION_BUTTONS } = constants;

interface IAuthButtonProps {
  data: { key: string; icon: string; label: string };
  // eslint-disable-next-line no-unused-vars
  buttonClickAction: (value: string) => void;
}
interface IMediaRegistrationProps {
  suggestionText: string;
}

const getButtonData = (displayPhoneButton: boolean) => {
  if (displayPhoneButton) {
    return COMMON_REGISTRATION_BUTTONS.find((item) => item.key === "phone");
  } else {
    return COMMON_REGISTRATION_BUTTONS.find((item) => item.key === "email");
  }
};

const AuthButton: FC<IAuthButtonProps> = ({ data, buttonClickAction }) => {
  return (
    <Button
      id="btn"
      rounded
      className="mx-auto my-[8px] sm:mx-[15px] sm:px-0 sm:py-0 md:px-3 md:py-1.5 md:mx-0 h-[48px] sm:border-0 md:border md:border-[#14427299] md:bg-[#EBF3FB] md:w-[340px] md:pl-[40px]"
      onClick={() => buttonClickAction(data.key)}>
      <div className="flex space-x-4 items-center">
        <img className={"w-[34px] h-[34px]"} src={data.icon} alt="" />
        <p className="sm:hidden md:block font-mardoto font-normal text-[14px] text-[#101B28]">
          {data.label}
        </p>
      </div>
    </Button>
  );
};

const MediaRegistration: FC<IMediaRegistrationProps> = ({ suggestionText }) => {
  const [displayPhoneButton, setDisplayPhoneButton] = useState(true);
  const { onRegistrationDataChange } = useContext(AuthContext);

  const navigate = useNavigate();
  const { lastPart } = useLocationEnhancer();
  const { handleLogin: googleLoginHandler } = useGoogleAuth();
  const { handleLogin: facebookLoginHandler } = useFacebookAuth();

  const mediaActionsConfig: { [key: string]: any } = {
    facebook: facebookLoginHandler,
    google: googleLoginHandler
  };

  const handleCommonButtonClick = (buttonType: string) => {
    if (buttonType === "phone") {
      onRegistrationDataChange({ byPhone: true, byEmail: false });
      setDisplayPhoneButton(false);
      return;
    }
    setDisplayPhoneButton(true);
    onRegistrationDataChange({ byPhone: false, byEmail: true });
  };
  const handleNavigate = () => {
    if (lastPart == "auth") {
      navigate("/auth/sign-in", { replace: true });
    } else {
      navigate("/auth", { replace: true });
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleMediaButtonsClick = (media: string) => {
    console.log(media);
    const mediaAction = mediaActionsConfig[media];

    mediaAction();
  };

  const LINE_WIDTH = classNames({
    "w-[70px] md:w-[129px]": lastPart === "sign-in",
    "w-[70px] md:w-[140px]": lastPart === "auth"
  });
  return (
    <>
      <div className="mx-auto mt-[140px] mb-[40px]">
        <div className="flex items-center justify-center space-x-2">
          <div className={`${LINE_WIDTH} h-[1px] bg-[#8080804D]`}></div>
          <p className="font-mardoto text-[14px]  ">{suggestionText}</p>
          <div className={`${LINE_WIDTH} h-[1px] bg-[#8080804D]`}></div>
        </div>
      </div>

      <div className={"flex flex-row justify-center items-center md:flex-col"}>
        {lastPart === "auth" && (
          <AuthButton
            data={getButtonData(displayPhoneButton)!}
            buttonClickAction={handleCommonButtonClick}
          />
        )}

        {MEDIA_REGISTRATION_BUTTONS.map((item) => (
          <AuthButton key={item.key} data={item} buttonClickAction={handleMediaButtonsClick} />
        ))}
      </div>

      <div className={"font-mardoto text-[14px] text-[#101B28CC] mt-[32px] text-center"}>
        {lastPart == "auth" ? "Արդեն ունե ՞ք գրանցված հաշիվ․" : "Դեռ գրանցվա՞ծ չեք․"}
        <span onClick={handleNavigate} className={"text-[#1376DD] font-bold cursor-pointer"}>
          {lastPart == "auth" ? "Մուտք գործել" : "Գրանցվել"}
        </span>
      </div>
    </>
  );
};

export default MediaRegistration;
