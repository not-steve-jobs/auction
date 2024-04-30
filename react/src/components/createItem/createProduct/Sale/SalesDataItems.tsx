import { FC, useEffect } from "react";
import { Form, Input, Select } from "antd";

import { AUCTION_DURATION } from "./saleConstants";

import SaleSwitchesItems from "./SaleSwitchesItems";

import constants from "../../../auth/constants";
import SwitchWrapper from "../../../formItems/SwitchWrapper";
import { productState } from "../../../../context/product-context";

const { SALE_SWITCHES, DIRECT_SALE_SWITCHES } = constants;

interface ISalesDataItemsProps {
  saleType: string;
}

const { Option } = Select;
const SalesDataItems: FC<ISalesDataItemsProps> = ({ saleType }) => {
  const { cardItems, setCardItems } = productState();

  useEffect(() => {
    setCardItems([]);
  }, [saleType]);

  const sale_switches = SALE_SWITCHES.map((item) => {
    return (
      <div key={item.key} className="flex justify-center item-center">
        <Form.Item {...item} className="w-680px" labelCol={{ span: 24 }}>
          <SwitchWrapper
            title={item.title}
            description={item.description}
            className=" w-[990px] mb-[32px]">
            <SaleSwitchesItems
              item={item}
              cardItems={cardItems}
              onSubmit={(items) => {
                setCardItems(items);
              }}
            />
          </SwitchWrapper>
        </Form.Item>
      </div>
    );
  });

  const dir_sale_switches = DIRECT_SALE_SWITCHES.map((item) => {
    return (
      <div key={item.key} className="flex justify-center item-center">
        <Form.Item {...item} className="w-680px" labelCol={{ span: 24 }}>
          <SwitchWrapper
            title={item.title}
            description={item.description}
            className=" w-[990px] mb-[32px]">
            <SaleSwitchesItems
              item={item}
              onSubmit={(items) => setCardItems(items)}
              cardItems={cardItems}
            />
          </SwitchWrapper>
        </Form.Item>
      </div>
    );
  });

  return (
    <>
      {saleType == "auction" ? (
        <>
          <Form.Item
            className="w-[680px] mt-[32px]"
            label="Աուկցիոնի տեւողություն"
            name="auction_duration"
            labelCol={{ span: 24 }}>
            <Select placeholder={"Աուկցիոնի տեւողություն"} style={{ marginBottom: "20px" }}>
              {/* TODO */}
              {AUCTION_DURATION.map((item) => (
                <Option key={item.name} value={item.value}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div className="w-full flex justify-start items-center space-x-[24px] mb-[32px]">
            <Form.Item
              className="w-[328px]"
              label="Ստարտի գին"
              name="auction_start_price"
              labelCol={{ span: 24 }}>
              <Input type="number" min={1} suffix="֏" />
            </Form.Item>

            <Form.Item label="Քանակ" name="auction_quantity" labelCol={{ span: 24 }}>
              <Input type="number" min={1} onChange={() => {}} className="w-[328px]" />
            </Form.Item>
          </div>

          {sale_switches}
        </>
      ) : saleType == "oneTimeSale" ? (
        <div>
          <div className="w-full flex justify-start items-center space-x-[24px] mb-[32px]  mt-[32px]">
            <Form.Item
              className="w-[328px]"
              label="Ստարտի գին"
              name="oneTimeSale_start_price"
              labelCol={{ span: 24 }}>
              <Input type="number" min={1} suffix="֏" />
            </Form.Item>

            <Form.Item label="Քանակ" name="oneTimeSale_quantity" labelCol={{ span: 24 }}>
              <Input type="number" min={1} max={10} onChange={() => {}} className="w-[328px]" />
            </Form.Item>
          </div>
          {dir_sale_switches}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SalesDataItems;
