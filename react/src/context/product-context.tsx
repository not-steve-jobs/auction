import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import React, { Context, useContext, useState } from "react";
type charInputsType = {
  quantity: string;
  percent: string;
  first: boolean;
};
const ProductContext: Context<any> = React.createContext({
  initialCategories: [],
  latestCategories: [],
  placesData: [],
  images: [],
  videos: [],
  inputs: [],
  cardItems: [],
  shippingIds: [],
  shippingDatas: [],
  setInputs: () => {},
  setCardItmes: () => {},

  // eslint-disable-next-line no-unused-vars
  changeImageData: (data: []) => {},

  // eslint-disable-next-line no-unused-vars
  changeVideoData: (data: []) => {},

  // eslint-disable-next-line no-unused-vars
  onChangeInitialCategories: (data: []) => {},

  // eslint-disable-next-line no-unused-vars
  onChangeLatestCategories: (data: []) => {},

  // eslint-disable-next-line no-unused-vars
  changePlaceDataFormat: (data: any) => {}
});

export const ProductContextProvider = (props: any) => {
  const shippingIds: string[] = [];
  const shippingDatas: [] = [];
  const [placesData, setPlacesData] = useState({});
  const [latestCategories, setLatestCategories] = useState([]);
  const [images, setImages] = useState<UploadFile<RcFile>[]>([]);
  const [videos, setVideos] = useState<UploadFile<RcFile>[]>([]);
  const [initialCategories, setInitialCategories] = useState([]);
  const [inputs, setInputs] = useState<charInputsType[]>([
    { quantity: "", percent: "", first: true }
  ]);
  const [cardItems, setCardItems] = useState([] || undefined);

  const onChangeInitialCategories = (data: []) => {
    setInitialCategories([...data]);
  };

  const onChangeLatestCategories = (data: []) => {
    setLatestCategories([...data]);
  };
  const changePlaceDataFormat = (newFormat: any, index: number) => {
    setPlacesData({ ...placesData, [index]: newFormat });
  };

  const changeImageData = (data: UploadFile<RcFile>[]) => {
    setImages(data);
  };
  const changeVideoData = (data: UploadFile<RcFile>[]) => {
    setVideos(data);
  };

  return (
    <ProductContext.Provider
      value={{
        shippingIds,
        shippingDatas,
        cardItems,
        setCardItems,
        inputs,
        setInputs,
        images: images,
        videos: videos,
        placesData: placesData,
        changeVideoData: changeVideoData,
        changeImageData: changeImageData,
        latestCategories: latestCategories,
        initialCategories: initialCategories,
        changePlaceDataFormat: changePlaceDataFormat,
        onChangeLatestCategories: onChangeLatestCategories,
        onChangeInitialCategories: onChangeInitialCategories
      }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export const productState = () => {
  return useContext(ProductContext);
};
export default ProductContext;
