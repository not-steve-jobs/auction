import { FC, ReactNode } from "react";

interface IServiceContentWrapperProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const ServiceContentWrapper: FC<IServiceContentWrapperProps> = ({
  children,
  title,
  description
}) => {
  return (
    <div>
      <h1
        className={"text-[34px] font-mardoto leading-[50px] font-medium text-[#232323] mb-[16px]"}>
        {title}
      </h1>
      {children}

      {!!description && (
        <div
          className={"px-[48px] text-[#404953] font-mardoto text-[14px] leading-[20px] my-[32px]"}>
          {description}
        </div>
      )}
    </div>
  );
};

export default ServiceContentWrapper;
