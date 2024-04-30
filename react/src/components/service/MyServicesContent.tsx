import MyServiceFilterAndAddButton from "./MyServiceFilterAndAddButton";
import MyServiceTabs from "./MyServiceTabs";
import MyServicesList from "./MyServicesList";
import { useEffect, useState } from "react";
import { getMyServices } from "../../services/services.service";
import { IMyServiceItem } from "../../interface/service.interface";

const MyServicesContent = () => {
  const [myServices, setMyServices] = useState<IMyServiceItem[]>([]);
  const [currentTab, setCurrentTab] = useState("all");

  const handleComponentFirstUpdate = () => {
    getMyServicesInfo();
  };

  const getMyServicesInfo = async (status?: string) => {
    try {
      const query = status && status !== "all" ? { status } : undefined;
      const res = await getMyServices(query);

      setMyServices(res as IMyServiceItem[]);
    } catch (e) {
      return e;
    }
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);

    getMyServicesInfo(tab);
  };

  useEffect(handleComponentFirstUpdate, []);

  return (
    <>
      <MyServiceFilterAndAddButton />
      <MyServiceTabs tab={currentTab} onTabChange={handleTabChange} />
      <MyServicesList data={myServices} tab={currentTab} />
    </>
  );
};

export default MyServicesContent;
