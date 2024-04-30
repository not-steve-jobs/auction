// hooks
import { useContext } from "react"; // components
import AuthTopLogo from "./AuthTopLogo";
import Button from "../shared/Button"; // store
import AuthContext from "../../context/auth-context"; // utils
import { formatEmail, formatPhoneNumber } from "../../utils/string.util"; // services
import { authPostData } from "../../services/auth.service";
import { IAuthJWT } from "../../types/auth.types";
import { getLocalStoreItem } from "../../utils/storage.util";
import { jwtDecode } from "../../utils/jwt.util";

const RecoverModeSelector = () => {
  const jwtToken = getLocalStoreItem("access_token");
  const tokenData: IAuthJWT = jwtDecode(jwtToken);

  const { onRecoverNextStep } = useContext(AuthContext);

  const handleRecoverModeSelect = async (mode: string, value?: string) => {
    const payload = { [mode]: value };

    try {
      await authPostData(payload, "getRecoverVerificationCodeUrl");

      onRecoverNextStep(3);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <AuthTopLogo>Գաղտնաբառի վերականգնում</AuthTopLogo>
      <div className={"mt-[70px]"}>
        <div className="text-[#101B28CC] text-center font-mardoto text-[14px] leading-[normal] mb-[70px]">
          Ընտրեք թե որ տարբերակով եք ցանկանում ստանալ հաստատման կոդը
        </div>
        <div>
          {tokenData?.phone && (
            <Button
              onClick={() => handleRecoverModeSelect("phone", tokenData?.phone)}
              className={`w-full flex justify-start px-[16px] h-[48px] rounded-[1000px] my-[10px] bg-[#1F598E] text-white hover:bg-[#F4B405] hover-transition`}>
              <p className={"text-[16px] leading-[20px] font-normal font-mardoto"}>
                Ստանալ SMS{" "}
                <span className={"font-bold"}>{formatPhoneNumber(tokenData?.phone)} </span>{" "}
                հեռախոսահամարին
              </p>
            </Button>
          )}
          {tokenData?.email && (
            <Button
              onClick={() => handleRecoverModeSelect("email", tokenData?.email)}
              className={`w-full flex justify-start px-[16px] h-[48px] rounded-[1000px] my-[10px] bg-[#1F598E] text-white hover:bg-[#F4B405] hover-transition`}>
              <p className={"text-[16px] leading-[20px] font-normal font-mardoto"}>
                Ստանալ նամակ <span className={"font-bold"}>{formatEmail(tokenData?.email)}</span>{" "}
                էլ. հասցեին
              </p>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default RecoverModeSelector;
