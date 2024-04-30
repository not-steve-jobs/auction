import { Divider } from "antd";
import { FC, ReactNode } from "react";
interface IFooterProps {
  children: ReactNode;
}
const Footer: FC<IFooterProps> = ({ children }) => {
  return (
    <>
      <Divider />
      {children}
      <div className={"text-[#ABABAB] text-center text-[10px] font-mardoto font-normal"}>
        Copyright © {new Date().getFullYear()} by PI LLC
      </div>
    </>
  );
};

export default Footer;
