import CategoryCard from "./CategoryCard";
import ServiceItem from "./ServiceItem";
import { useContext, useEffect } from "react";
import ServiceContext from "../../context/service-context";
import { useNavigate } from "react-router-dom";
import { getServiceCategories } from "../../services/services.service";

const ServiceCategory = () => {
  const navigate = useNavigate();
  const { serviceCategoryData, onCategoryDataUpdate } = useContext(ServiceContext);

  const handleCategoryClick = (item: any) => {
    onCategoryDataUpdate([...serviceCategoryData, item]);

    if (!item.subCategories || !item.subCategories?.length) {
      navigate("/service/create-service");
    }
  };

  const onComponentFirstUpdate = async () => {
    const categories = await getServiceCategories();

    onCategoryDataUpdate([categories]);
  };

  useEffect(() => {
    onComponentFirstUpdate();
  }, []);

  return (
    <div>
      {serviceCategoryData.length === 1 ? (
        <div className={"my-[32px] flex items-center flex-wrap gap-[16px]"}>
          {serviceCategoryData[0]?.map((item: any) => (
            <CategoryCard
              key={item.id}
              image={item.image}
              category_name={item.name}
              applications_received_count={item.applications_received_count}
              onClick={() => handleCategoryClick(item)}
            />
          ))}
        </div>
      ) : (
        <div className={"my-[32px] flex flex-col gap-y-[16px]"}>
          {serviceCategoryData[serviceCategoryData.length - 1]?.subCategories?.map((item: any) => (
            <ServiceItem
              key={item.id}
              image={item.image}
              forChoose={!!item.subCategories}
              category_name={item.name}
              onClick={() => handleCategoryClick(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceCategory;
