import { FC, useState } from "react";
import { Divider } from "antd";

import TempleteModal from "./TempleteModal";

import trash from "../../../../assets/images/blue-trash.svg";
import template from "../../../../assets/images/template.svg";
import { addTemplate } from "../../../../services/products.service";
import { productState } from "../../../../context/product-context";

interface IShippingTableActionProps {
  id: number;
  shippingData: [];
  setShippingData: any;
  // eslint-disable-next-line no-unused-vars
  disableInputs: (id: number, dataId: string) => void;
  tableInputValues?: { price: string | number | any; days: string | number | any };
}
const ShippingTableAction: FC<IShippingTableActionProps> = ({
  id,
  shippingData,
  setShippingData,
  disableInputs,
  tableInputValues
}) => {
  const { placesData } = productState();
  const [opneModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  const handleDeldete = () => {
    const updatedData = shippingData.filter((item: { key: number }) => item.key !== id);
    setShippingData(updatedData);
  };

  const togleOpenModal = () => {
    setOpenModal(!opneModal);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await addTemplate({
        ...tableInputValues,
        place_data: placesData[id],
        name: title,
        template: true
      });

      disableInputs(id, data.id);
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div
        className="flex justify-start items-center space-x-[10px] cursor-pointer"
        onClick={togleOpenModal}>
        <img src={template} />
        <p className=" font-mardoto text-[#1F598E] text-[14px] leading-[16px] font-medium">
          Հիշել որպես ձևանմուշ
        </p>
      </div>
      <Divider style={{ color: "#B3B3B3", margin: "10px 0" }} />
      <div
        className="flex justify-start items-center  space-x-[10px]   cursor-pointer"
        onClick={handleDeldete}>
        <img src={trash} />
        <p className=" font-mardoto text-[#1F598E] text-[14px] leading-[16px] font-medium">Ջնջել</p>
      </div>
      {opneModal && (
        <TempleteModal
          onChangeTable={(name: string) => {
            setTitle(name);
          }}
          open={opneModal}
          handleOk={handleSubmit}
          handleCancel={() => {
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ShippingTableAction;
