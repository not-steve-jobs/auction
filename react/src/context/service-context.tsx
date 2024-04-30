import React, { Context, useState } from "react";

const ServiceContext: Context<any> = React.createContext({
  serviceCategoryData: [],

  // eslint-disable-next-line no-unused-vars
  onCategoryDataUpdate: (data: any) => {}
});

export const ServiceContextProvider = (props: any) => {
  const [serviceCategoryData, setServiceCategoryData] = useState([]);

  const onCategoryDataUpdate = (data: any) => {
    setServiceCategoryData(data);
  };

  return (
    <ServiceContext.Provider
      value={{
        serviceCategoryData: serviceCategoryData,
        onCategoryDataUpdate: onCategoryDataUpdate
      }}>
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceContext;
