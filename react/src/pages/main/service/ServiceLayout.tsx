import { Outlet } from "react-router-dom";
import { ServiceContextProvider } from "../../../context/service-context";

const ServiceLayout = () => {
  return (
    <ServiceContextProvider>
      <Outlet />
    </ServiceContextProvider>
  );
};

export default ServiceLayout;
