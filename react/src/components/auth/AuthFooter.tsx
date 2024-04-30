import { useContext } from "react";

import constants from "./constants";

import useLocationEnhancer from "../../hooks/useLocationEnhancer";

import AuthContext from "../../context/auth-context";

const { AUTH_FOOTER_LIST_CLASSES } = constants;

const AuthFooter = () => {
  const { currentStep } = useContext(AuthContext);

  const { lastPart } = useLocationEnhancer();

  return (
    <div className={"w-full pt-[28px] pb-[8px] border-t border-t-[#8080804D]"}>
      {currentStep === 1 && lastPart === "auth" && (
        <div className={`text-[#101B28] ${AUTH_FOOTER_LIST_CLASSES} flex justify-center`}>
          Ստեղծելով հաշիվ՝ դուք համաձայնում եք մեր Pi.am-ի
        </div>
      )}
      <div className={"flex justify-center mt-[4px] mb-[8px]"}>
        <ul className={"list-none flex items-center"}>
          <li className={`text-[#1376DD]  ${AUTH_FOOTER_LIST_CLASSES}`}>
            <a href={"#"}>Օգտագործման պայմաններ</a>
          </li>
          {currentStep === 1 && lastPart === "auth" && (
            <div className={`${AUTH_FOOTER_LIST_CLASSES} text-[#101B28]`}>և</div>
          )}
          <li className={`text-[#1376DD]  ${AUTH_FOOTER_LIST_CLASSES}`}>
            <a href={"#"}>Գաղտնիության քաղաքականություն</a>
          </li>
        </ul>
      </div>
      <div className={"text-[#ABABAB] text-center text-[10px] font-mardoto font-normal"}>
        Copyright © {new Date().getFullYear()} by PI LLC
      </div>
    </div>
  );
};

export default AuthFooter;
