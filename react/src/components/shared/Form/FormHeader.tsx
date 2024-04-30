import { Divider } from "antd";

import HelpSettings from "../HelpSettings";

import logo from "../../../assets/images/logo_small.svg";

const FormHeader = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <img src={logo} alt="" className="w-[50px] h-[50px]" />
        <HelpSettings />
      </div>
      <Divider style={{ margin: "15px 0" }} />
    </div>
  );
};

export default FormHeader;
