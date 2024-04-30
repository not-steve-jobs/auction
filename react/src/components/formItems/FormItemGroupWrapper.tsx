import InfoIcon from "../../assets/images/info_icon.svg";
import { FC, ReactNode } from "react";
import { Popover } from "antd";

interface IFormItemGroupWrapperProps {
  title: string;
  titleInfo?: string;
  subtitle?: string;
  subtitleInfo?: string;
  description?: string;
  children: ReactNode;
}

const FormItemGroupWrapper: FC<IFormItemGroupWrapperProps> = ({
  children,
  title,
  titleInfo,
  subtitle,
  subtitleInfo,
  description
}) => {
  return (
    <div className={"w-full flex flex-col gap-y-[32px] my-[32px]"}>
      <div className={"flex flex-col gap-y-[8px]"}>
        <div className={"flex items-start"}>
          <h2
            className={
              "font-mardoto text-[32px] leading-[30px] text-[#232323] font-bold mr-[12px]"
            }>
            {title}
          </h2>
          {!!titleInfo && (
            <Popover content={<div className={"max-w-[250px]"}>{titleInfo}</div>}>
              <img src={InfoIcon} alt="info_icon" className={"cursor-pointer"} />
            </Popover>
          )}
        </div>
        {!!subtitle && (
          <div className={"flex items-start"}>
            <h4 className={"font-mardoto text-[20px] font-medium leading-normal mr-[12px]"}>
              {subtitle}
            </h4>

            {!!subtitleInfo && (
              <Popover content={<div className={"max-w-[250px]"}>{subtitleInfo}</div>}>
                <img src={InfoIcon} alt="info_icon" className={"cursor-pointer"} />
              </Popover>
            )}
          </div>
        )}

        {!!description && (
          <h6 className={"font-mardoto font-light text-[14px] text-[#404953] leading-normal"}>
            {description}
          </h6>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default FormItemGroupWrapper;
