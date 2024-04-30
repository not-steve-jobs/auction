import React, { FC, HTMLAttributes } from "react";
import NotificationIcon from "../../assets/images/notification_icon.svg";
import OptionsIcon from "../../assets/images/options_icon.svg";
import ArrowToRight from "../../assets/images/breadcrumb-arrow.svg";
import ServiceStatus from "./ServiceStatus";

interface IServiceItemProps extends HTMLAttributes<HTMLDivElement> {
  chosen?: boolean;
  forChoose?: boolean;
  serviceItem?: boolean;
  image: string;
  category_name: string;
  applications_received_count?: string | number;
  status?: string;
  notification_count?: number | string;
}

const ServiceItem: FC<IServiceItemProps> = ({
  image,
  status,
  chosen,
  forChoose,
  serviceItem,
  category_name,
  notification_count,
  applications_received_count,
  ...attributes
}) => {
  return (
    <div
      className={`flex items-center justify-between p-[16px] rounded-[3px] border border-[#8080804D ${
        !serviceItem ? "cursor-pointer" : ""
      }`}
      {...attributes}>
      <div className={"flex items-center"}>
        <div
          className={
            "flex items-center justify-center w-[48px] h-[48px] rounded-[3px] bg-[#EEEEEE] p-[9px] mr-[16px]"
          }>
          <img src={image} alt="item_image" />
        </div>
        <div>
          <h3 className={"font-mardoto font-bold leading-[22px] text-[20px]"}>{category_name}</h3>
          {serviceItem && (
            <p className={"font-mardoto font-normal leading-[22px] text-[14px]"}>
              Ստացված հայտեր - {applications_received_count}
            </p>
          )}
        </div>
      </div>
      {serviceItem && (
        <div className={"flex items-center gap-x-[16px]"}>
          <div className={"relative cursor-pointer"}>
            {!!notification_count && (
              <div
                className={
                  "absolute flex items-center justify-center bg-[#DC4536] text-white w-[20px] h-[20px] rounded-[10px] top-[-8px] right-[-5px] text-[12px]  font-medium font-mardoto leading-normal"
                }>
                {notification_count > 99 ? "99+" : notification_count}
              </div>
            )}

            <img src={NotificationIcon} alt="notification_icon" />
          </div>

          {status && (
            <div>
              {/*<ServiceStatus type={"active"} />*/}
              {/*<ServiceStatus type={"passive"} />*/}
              <ServiceStatus type={status} />
            </div>
          )}

          <div className={"cursor-pointer"}>
            <img src={OptionsIcon} alt="option_icon" />
          </div>
        </div>
      )}
      {forChoose && !chosen && (
        <div className={"cursor-pointer"}>
          <img src={ArrowToRight} alt="arrow_to_right" />
        </div>
      )}
      {chosen && status && (
        <div>
          <ServiceStatus type={status} />
        </div>
      )}
    </div>
  );
};

export default ServiceItem;
