import Button from "../shared/Button";
import ArrowToRight from "../../assets/images/arrow-to-right.svg";
import { NavLink } from "react-router-dom";

const AboutServices = () => {
  return (
    <div>
      <h1 className={"font-mardoto text-[42px] font-medium leading-normal mb-[30px]"}>
        Բոլոր ծառայությունները
      </h1>
      <div className={"my-[32px]"}>
        <p className={"text-[16px] font-mardoto font-medium leading-[22px] mb-[16px]"}>
          Figma ipsum component variant main layer. Selection content figjam overflow slice undo.
        </p>
        <p className={"text-[16px] font-mardoto leading-[22px]"}>
          Figma ipsum component variant main layer. Selection content figjam overflow slice undo.
          Link pen effect group flatten move variant. Rectangle project blur share list line star.
          Selection clip team library main inspect object ipsum. Group bullet community scale font
          share project image. Follower font font export duplicate selection clip bold community
          rectangle. Italic mask list flatten polygon.Figma ipsum component variant main layer.
          Selection content figjam overflow slice undo. Link pen effect group flatten move variant.
          Rectangle project blur share list line star. Selection clip team library main inspect
          object ipsum. Group bullet community scale font share project image. Follower font font
          export duplicate selection clip bold community rectangle. Italic mask list flatten
          polygon.
        </p>
      </div>

      <div>
        <NavLink to={"/service/categories"}>
          <Button
            className={
              "bg-[#1F598E] hover:bg-[#F4B405] hover-transition rounded-[3px] text-[#FFF] font-mardoto text-[14px] leading-normal py-[12px] font-semibold flex justify-center items-center w-[217px]"
            }>
            Ընտրել ծառայություն{" "}
            <img src={ArrowToRight} alt="arrow-to-right" className={"ml-[10px]"} />
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default AboutServices;
