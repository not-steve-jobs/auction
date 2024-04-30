import { FC, ReactNode } from "react";

interface IServiceWrapperProps {
  children: ReactNode;
}

const ServiceWrapper: FC<IServiceWrapperProps> = ({ children }) => {
  return <div className={"max-w-[1192px] mx-[32px] pt-[10px] pb-[32px]"}>{children}</div>;
};

export default ServiceWrapper;
