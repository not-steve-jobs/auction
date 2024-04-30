import { FC } from "react";
import { IServiceStatusConfig } from "../../interface/service.interface";

interface IServiceStatusProps {
  type: string;
}

const statusConfig: IServiceStatusConfig = {
  active: {
    label: "Ակտիվ",
    bg: "bg-[#0D9D59]"
  },
  passive: {
    label: "Պասիվ",
    bg: "bg-[#F4B405]"
  },
  draft: {
    label: "Սևագիր",
    bg: "bg-[#404953]"
  },
  archive: {
    label: "Արխիվ",
    bg: "bg-[#B3B3B3]"
  }
};

const ServiceStatus: FC<IServiceStatusProps> = ({ type }) => {
  const { label, bg } = statusConfig[type as keyof IServiceStatusConfig];

  return <div className={`service_status_block ${bg}`}>{label}</div>;
};

export default ServiceStatus;
