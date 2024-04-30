import { FC, useState } from "react";
import { DatePicker, Form, Input, Space } from "antd";

import CreateItemCard from "./CreateItemCard";
import CreateItemDinamiInput from "../Characteristics/CreateItemDinamiInput";

import AddLinkedItemModal from "../../AddLinkedItemModal/AddLinkedItemModal";
import InputInfo from "../../../shared/InputInfo";
import { getAllProducts } from "../../../../services/products.service";

interface ISaleSwitchesItemsProps {
  cardItems?: any[];
  item: { key: string };
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (items: any) => void;
}

const SaleSwitchesItems: FC<ISaleSwitchesItemsProps> = ({ item, cardItems, onSubmit }) => {
  const [cardItemsData, setCardItemsData] = useState([]);

  const handleGetAllProducts = async () => {
    try {
      const { data } = await getAllProducts();
      setCardItemsData(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {item.key == "sale_sw_1" ? (
        <Form.Item
          label="Ուղիղ վաճառքի գին"
          name="auction_direct_sales_price"
          labelCol={{ span: 24 }}>
          <Input type="number" min={1} suffix="֏" />
        </Form.Item>
      ) : //  <InputInfo text="Մինիմում գնի չափը" />

      item.key == "sale_sw_2" ? (
        <>
          <Form.Item
            label="Ապահովագրված նվազագույն գին"
            name="auction_min_insured_price"
            labelCol={{ span: 24 }}>
            <Input type="number" min={1} suffix="֏" />
          </Form.Item>
        </>
      ) : item.key == "sale_sw_3" ? (
        <>
          <Form.Item
            label="Նվազագույն գին"
            name="auction_min_allowed_price"
            labelCol={{ span: 24 }}>
            <Input type="number" min={1} suffix="֏" />
          </Form.Item>
          <InputInfo text="Նշեք այն գինը, որից ցածր արված գնառաջարկները չեք ցանկանում ստանալ" />
          <Form.Item
            label="Ավտոմատ ընդունման նվազագույն սահմանաչափ"
            name="auction_automatic_acceptance_price"
            labelCol={{ span: 24 }}>
            <Input type="number" min={1} suffix="֏" />
          </Form.Item>
          <InputInfo text="Նշեք այն նվազագույն գինը, որից մեծ կամ հավասար առաջարկի դեպքում այն կընդունվի ավտոմատ կերպով" />
        </>
      ) : item.key == "sale_sw_4" ? (
        <>
          <Form.Item label="Հրապարակման ամսաթիվ" name="auction_start_time" labelCol={{ span: 24 }}>
            <DatePicker placeholder="" />
          </Form.Item>
        </>
      ) : item.key == "sale_sw_5" ? (
        <Form.Item
          label="Ավելացրեք կապակցված ապրանքները"
          name="auction_related_products"
          labelCol={{ span: 24 }}>
          {onSubmit && (
            <Input
              readOnly
              suffix={
                <AddLinkedItemModal
                  onSubmit={onSubmit}
                  cardItems={cardItemsData}
                  onClick={handleGetAllProducts}
                />
              }
            />
          )}
          <Space size={[23, 16]} wrap className="mt-[48px]">
            {cardItems &&
              cardItems.map((item) => {
                return <CreateItemCard {...item} key={item.key} selected={true} />;
              })}
          </Space>
        </Form.Item>
      ) : item.key == "dir_sale_sw_1" ? (
        <CreateItemDinamiInput />
      ) : item.key == "dir_sale_sw_2" ? (
        <>
          <Form.Item label="Նվազագույն գին" name="oneTimeSale_min_price" labelCol={{ span: 24 }}>
            <Input type="number" min={1} suffix="֏" />
          </Form.Item>{" "}
          <Form.Item
            label="Ավտոմատ ընդունման նվազագույն սահմանաչափ"
            name="oneTimeSale_automatic_acceptance_price"
            labelCol={{ span: 24 }}>
            <Input type="number" min={1} suffix="֏" />
          </Form.Item>
        </>
      ) : item.key == "dir_sale_sw_3" ? (
        <Form.Item
          label="Հրապարակման ամսաթիվ"
          name="oneTimeSale_start_time"
          labelCol={{ span: 24 }}>
          <DatePicker placeholder="" style={{ width: "328px" }} />
        </Form.Item>
      ) : item.key == "dir_sale_sw_4" ? (
        <Form.Item
          label="Ավելացրեք կապակցված ապրանքները"
          name="oneTimeSale_related_products"
          labelCol={{ span: 24 }}>
          {onSubmit && (
            <Input
              readOnly
              suffix={
                <AddLinkedItemModal
                  onSubmit={onSubmit}
                  cardItems={cardItemsData}
                  onClick={handleGetAllProducts}
                />
              }
            />
          )}
          <Space size={[23, 16]} wrap className="mt-[48px]">
            {cardItems &&
              cardItems.map((item) => {
                return <CreateItemCard key={item.key} {...item} selected={true} />;
              })}
          </Space>
        </Form.Item>
      ) : (
        ""
      )}
    </>
  );
};

export default SaleSwitchesItems;
