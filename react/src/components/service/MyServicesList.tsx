import ServiceItem from "./ServiceItem";
import { FC } from "react";
import { IMyServiceItem } from "../../interface/service.interface";
import { getMultimedia } from "../../utils/multimedia.util";

interface IMyServicesListProps {
  data: IMyServiceItem[];
  tab: string;
}

const MyServicesList: FC<IMyServicesListProps> = ({ data, tab }) => {
  const getServiceMultimedia = (files: { name: string }[]) => {
    return (files.length && getMultimedia(files[0].name)) || "test-image.jpg";
  };

  return (
    <>
      {data.map((item, index) => (
        <div className={"flex flex-col gap-y-[16px] mt-[25px]"} key={index}>
          <div>
            <h1 className={"text-[20px] leading-[22px] font-mardoto font-bold"}>{item.name}</h1>
          </div>

          {item.services.map((serviceItem, serviceItemIndex) => (
            <ServiceItem
              key={serviceItemIndex}
              serviceItem
              image={getServiceMultimedia(serviceItem.files)}
              category_name={serviceItem.name}
              applications_received_count={0}
              notification_count={0}
              status={tab === "all" ? serviceItem.status : undefined}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default MyServicesList;
