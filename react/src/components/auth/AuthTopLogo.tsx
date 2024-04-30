import { FC, ReactNode } from "react";

import SmallLogo from "../../assets/images/logo_small.svg";

interface IAuthTopLogoProps {
  children: ReactNode;
}
const AuthTopLogo: FC<IAuthTopLogoProps> = ({ children }) => {
  return (
    <div className="flex flex-col space-y-10 w-[101%]">
      <img src={SmallLogo} alt="logo" className="w-[80px] h-[80px] mx-auto" />
      <div className="font-mardoto leading-7 font-medium text-[#144272] text-[24px] underline underline-offset-8 decoration-2  text-center">
        {children}
      </div>
    </div>
  );
};

export default AuthTopLogo;
