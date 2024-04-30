// hooks
import { FC, useContext, useEffect, useState } from "react";

// utils
import { isExpiredTime } from "../../utils/date.util";

// components
import Timer from "../shared/Timer";
import Button from "../../components/shared/Button";
import FormTopLogo from "../../components/auth/AuthTopLogo";
import VerificationInput from "../../components/auth/VerificationInput";

// store
import authContext from "../../context/auth-context";

// services
import { authPostData } from "../../services/auth.service";

// types
import { IAuthJWT } from "../../types/auth.types";

// constants
import constants from "./constants";
import { getLocalStoreItem } from "../../utils/storage.util";
import { jwtDecode } from "../../utils/jwt.util";

const {
  TEXT_BASE_CLASSES,
  RESEND_BUTTON_CLASSES,
  REGISTER_JWT_DURATION,
  RESEND_CODE_TIMER_DURATION
} = constants;

interface ICodeVerificationProps {
  resendURL: string;
  activateCodeURL: string;
  nextStepHandler: () => void;
  changeClickHandler: () => void;
}

const CodeVerification: FC<ICodeVerificationProps> = ({
  resendURL,
  activateCodeURL,
  nextStepHandler,
  changeClickHandler
}) => {
  const jwtToken = getLocalStoreItem("access_token");
  const tokenData: IAuthJWT = jwtDecode(jwtToken);

  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [verificationError, setVerificationError] = useState<string>("");
  const [duration, setDuration] = useState<number>(RESEND_CODE_TIMER_DURATION);

  const { comeToFirstStep, registrationData } = useContext(authContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (duration > 0) {
        setDuration(duration - 1);
      } else {
        setShowTimer(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const handleTimerChange = () => {
    if (duration > 0) {
      setDuration(duration - 1);
    } else {
      setShowTimer(false);
    }
  };

  const handleResendClick = async () => {
    const isExpiredJWTTime = isExpiredTime(tokenData?.start_time, REGISTER_JWT_DURATION);

    setShowTimer(true);
    setVerificationError("");
    setDuration(RESEND_CODE_TIMER_DURATION);

    if (isExpiredJWTTime) {
      comeToFirstStep();
      return;
    }

    try {
      await authPostData(null, resendURL);
    } catch (err) {
      console.log(err);
    }
  };

  const checkVerificationCode = async (value: string) => {
    const isExpiredJWTTime = isExpiredTime(tokenData?.expiration_time, REGISTER_JWT_DURATION);
    const isExpiredCodeTime = isExpiredTime(tokenData?.start_time, RESEND_CODE_TIMER_DURATION);

    if (isExpiredJWTTime) {
      comeToFirstStep();
      return;
    }

    if (isExpiredCodeTime) {
      setVerificationError("Մուտքագրված կոդը այլևս վավեր չէ։ Անհրաժե՞շտ է վերաուղարկել նոր կոդ");
    }

    if (isExpiredJWTTime || isExpiredCodeTime) return;

    try {
      const payload = { verification_code: value };
      await authPostData(payload, activateCodeURL);
      setVerificationError("");

      nextStepHandler();
    } catch (err) {
      setVerificationError("Մուտքագրված կոդը սխալ է");
    }
  };

  const handleChangeClick = () => {
    changeClickHandler();
  };

  return (
    <>
      <FormTopLogo>
        Հաստատեք Ձեր {registrationData.byPhone ? " հեռախոսահամարը " : " էլ.հասցեն "}
      </FormTopLogo>
      <div className={`${TEXT_BASE_CLASSES} mt-[80px] mb-[60px]`}>
        Մեկանգամյա հաստատման կոդը ուղարկվել է
        <span className={"font-semibold"}>
          {" "}
          {tokenData?.email ? tokenData?.email : tokenData?.phone}
        </span>
        {tokenData?.email ? " էլ. հասցեին" : " հեռախոսահամարին"}(
        <span className={"font-semibold text-[#1376DD] cursor-pointer"} onClick={handleChangeClick}>
          Փոփոխել
        </span>
        )
      </div>
      <VerificationInput
        handleCodeCheck={checkVerificationCode}
        error={verificationError}
        setError={setVerificationError}
      />
      {showTimer ? (
        <div className={`mt-[60px]`}>
          <div className={`${TEXT_BASE_CLASSES}`}>
            Կոդը հնարավոր կլինի վերաուղարկել
            <Timer
              duration={duration}
              handleTimerChange={handleTimerChange}
              className={"text-[#F4B405] text-[20px] font-semibold"}
            />
            վայրկյանից
          </div>
        </div>
      ) : (
        <Button hover active className={RESEND_BUTTON_CLASSES} onClick={handleResendClick}>
          Վերաուղարկել հաստատման կոդը
        </Button>
      )}
    </>
  );
};

export default CodeVerification;
