import { FC, ReactNode } from "react";
import inputInfo from "../../assets/images/InputInfo.svg";

interface IInputInfoProps {
  text: string;
  infoIcon?: ReactNode;
}

const InputInfo: FC<IInputInfoProps> = ({ text, infoIcon }) => {
  return (
    <div className="flex items-center justify-start mt-[8px]">
      {infoIcon ? (
        <img src={inputInfo} className="" />
      ) : (
        <p className=" font-mardoto text-[#808080] text-[12px] leading-[14px] ">{text}</p>
      )}
    </div>
  );
};

export default InputInfo;
