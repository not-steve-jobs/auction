import { useContext } from "react";
import BreadcrumbIcon from "../../assets/images/breadcrumb-arrow.svg";
import ServiceContext from "../../context/service-context";
import { useNavigate } from "react-router-dom";

const ServiceBreadcrumb = () => {
  const { serviceCategoryData, onCategoryDataUpdate } = useContext(ServiceContext);
  const navigate = useNavigate();

  const handleBreadcrumbClick = (index: number) => {
    const updatedData = serviceCategoryData.slice(0, index + 1);

    onCategoryDataUpdate(updatedData);
  };

  const handleToServicesBreadcrumbClick = () => {
    navigate("/service");
  };

  return (
    <div className={"flex items-center"}>
      <div className={"flex items-center cursor-pointer"} onClick={handleToServicesBreadcrumbClick}>
        <p className={`text-[#404953] text-[18px] font-normal leading-normal font-mardoto`}>
          Բոլոր ծառայությունները
        </p>
        <img src={BreadcrumbIcon} alt="breadcrumb_icon" className={"mx-[8px] w-[24px] h-[24px]"} />
      </div>
      {serviceCategoryData.map((listItem: any, index: number) => (
        <div
          key={listItem.name || "Կատեգորիաներ"}
          className={"flex items-center cursor-pointer"}
          onClick={() => {
            handleBreadcrumbClick(index);
          }}>
          <p
            className={`${
              index === serviceCategoryData.length - 1 ? "text-[#1F598E]" : "text-[#404953]"
            } text-[18px] font-normal leading-normal font-mardoto`}>
            {listItem.name || "Կատեգորիաներ"}
          </p>
          {index !== serviceCategoryData.length - 1 && (
            <img
              src={BreadcrumbIcon}
              alt="breadcrumb_icon"
              className={"mx-[8px] w-[24px] h-[24px]"}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceBreadcrumb;
