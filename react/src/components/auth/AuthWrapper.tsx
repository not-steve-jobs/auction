import { FC, ReactNode } from "react";

import AuthFooter from "./AuthFooter";

import sideImage from "../../assets/images/img.svg";
import help from "../../assets/images/help.svg";

interface IAuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: FC<IAuthWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative w-full flex flex-col space-y-10 bg-white  md:flex-row md:space-y-0 md:m-0 sm:flex-row sm:space-y-0 sm:m-0 ">
      <div className="flex items-center justify-center 2xl:min-w-[61%] xl:min-w-[53%]  md:min-w-[192px] sm:min-w-[30px] bg-[#144272] ">
        <img src={sideImage} alt="" className="w-[709px] hidden 2xl:block  xl:block" />
      </div>

      <div className="relative w-full flex justify-between">
        <div className="absolute right-5 top-5">
          <img src={help} alt="help" />
        </div>
        <div className={"w-full flex flex-col justify-between"}>
          <div className="w-[300px] md:min-w-[424px] lg:min-w-[415px] mx-auto lg:pt-[40px] pt-[20px] ">
            {children}
          </div>
          <div className={"mt-[22px]"}>
            <AuthFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
