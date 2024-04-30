import { NavLink } from "react-router-dom";

const HelpSettings = () => {
  return (
    <div className={"flex items-center"}>
      <NavLink
        to={"/help"}
        className={"font-mardoto text-[12px] leading-normal text-[#2C63AC] font-normal"}>
        Help
      </NavLink>
      <div
        className={"font-mardoto text-[16px] text-[#B3B3B3] leading-normal font-normal mx-[6px]"}>
        /
      </div>
      <NavLink
        to={"/settings"}
        className={"font-mardoto text-[12px] leading-normal text-[#2C63AC] font-normal"}>
        Settings
      </NavLink>
    </div>
  );
};

export default HelpSettings;
