import { Form, Switch } from "antd";
import { FC, ReactNode, useState } from "react";
import InfoIcon from "../../assets/images/info_icon.svg";

interface ISwitchWrapperProps {
  title: string;
  description: string;
  children?: ReactNode;
  className?: any;
  name?: string;
}
const SwitchWrapper: FC<ISwitchWrapperProps> = ({
  title,
  description,
  children,
  name,
  className
}) => {
  const [activeated, setActivated] = useState(false);

  const toggleswitch = (checked: boolean) => {
    setActivated(checked);
  };

  return (
    <div className={` border border-[#667085] p-6  rounded-lg m-auto ${className}`}>
      <div className="flex justify-between items-center pb-2">
        <div className="flex justify-center items-center">
          <p className="font-mardoto text-xl leading-6 mr-3  font-medium  text-black">{title} </p>
          <img src={InfoIcon} alt="system" />
        </div>
        <Form.Item valuePropName="checked" name={name}>
          <Switch
            style={{ background: `${activeated ? "#F4B405" : "#667085"}` }}
            onChange={toggleswitch}
            checked={activeated}
          />
        </Form.Item>
      </div>
      <div>
        <p className="font-mardoto text-[#404953] font-normal text-sm leading-4">{description}</p>
      </div>
      {activeated && children}
    </div>
  );
};

export default SwitchWrapper;
