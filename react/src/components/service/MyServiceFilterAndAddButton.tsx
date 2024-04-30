import MyServiceFilter from "./MyServiceFilter";
import { NavLink } from "react-router-dom";
import Button from "../shared/Button";
import ButtonAddIcon from "../../assets/images/button_add_icon.svg";

const MyServiceFilterAndAddButton = () => {
  return (
    <div>
      <div className={"flex items-center justify-end gap-x-[16px]"}>
        <MyServiceFilter />
        <NavLink to={"/service"}>
          <Button
            hover
            className={
              "flex items-center justify-center gap-x-[10px] bg-[#1F598E] rounded-[3px] w-[266px] h-[37px]"
            }>
            <span className={"text-[14px] font-mardoto font-medium leading-normal text-white"}>
              Ավելացնել նոր ծառայություն{" "}
            </span>
            <img src={ButtonAddIcon} alt="button_add_icon" />
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default MyServiceFilterAndAddButton;
