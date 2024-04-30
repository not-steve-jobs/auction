import { useState } from "react";
import { Divider, Form, Input, Select } from "antd";

import constants from "../../../auth/constants";
import SwitchWrapper from "../../../formItems/SwitchWrapper";
import ShipingDataSwitchItems from "./ShipingDataSwitchItems";
import FormItemGroupWrapper from "../../../formItems/FormItemGroupWrapper";
import {
  getCitiesByRegionId,
  getPostalCodeByCityId,
  getRegions
} from "../../../../services/products.service";

const { Option } = Select;

const { SHIPPING_DATA_SELECT, SWITCHES } = constants;

const FormShippingData = () => {
  const [currentIds, setCurrentIds] = useState<{
    region_id: string | any;
    city_id: string | any;
  }>({
    region_id: null,
    city_id: null
  });
  const [shippingConstants, setShippingConstants] = useState<
    | {
        region: [];
        city: [];
        postal_code: [];
      }
    | any
  >({
    region: [],
    city: [],
    postal_code: []
  });

  const onChangeAddress = (data: any) => {
    if (data?.region) {
      setShippingConstants({ ...shippingConstants, ...data, city: [], postal_code: [] });
    } else {
      setShippingConstants({ ...shippingConstants, ...data });
    }
  };

  const changeCurrentId = (data: {}) => {
    setCurrentIds({ ...currentIds, ...data });
  };

  const shipping_details_switches = SWITCHES.map((item) => {
    return (
      <div key={item.key} className="flex justify-center item-center">
        <SwitchWrapper
          title={item.title}
          description={item.description}
          name={item.name}
          className="w-[990px]">
          <ShipingDataSwitchItems item={item} />
        </SwitchWrapper>
      </div>
    );
  });

  const handleGetOptionDatas = async (key: string) => {
    if (key === "region") {
      try {
        const { data } = await getRegions();
        onChangeAddress({ region: data });
      } catch (error) {
        console.log(error);
      }
    }
    if (key == "city") {
      try {
        const { data } = await getCitiesByRegionId(currentIds.region_id);
        onChangeAddress({ city: data });
      } catch (error) {
        console.log(error);
      }
    }

    if (key == "postal_code") {
      try {
        const { data } = await getPostalCodeByCityId(currentIds.city_id);
        onChangeAddress({ postal_code: data });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <FormItemGroupWrapper
        title={"Առաքման տվյալներ"}
        titleInfo="Առաքման տվյալներ"
        subtitle="Ապրանքի գտնվելու վայրը"
        subtitleInfo="Ապրանքի գտնվելու վայրը"
        description="Նշեք ապրան
        քի գտնվելու վայրը, որտեղից գնորդը կամ առաքում իրականացնող կազմակերպությունը պետք է վերցնի այն ">
        <div className="flex justify-between items-center">
          {SHIPPING_DATA_SELECT.map((item: any) => {
            return (
              <Form.Item
                key={item.key}
                {...item}
                style={{ width: "314px" }}
                labelCol={{ span: 24 }}>
                <Select
                  allowClear
                  placeholder={item.placeholder}
                  onClick={() => {
                    handleGetOptionDatas(item.key);
                  }}
                  onSelect={(id) => {
                    if (item.key == "region") {
                      setShippingConstants({ city: [] });
                      changeCurrentId({ region_id: id });
                    } else if (item.key == "city") {
                      changeCurrentId({ city_id: id });
                    } else {
                      return;
                    }
                  }}>
                  {shippingConstants &&
                    shippingConstants[item.key]?.map((items: any) => {
                      return (
                        <Option key={items.id} value={items.id}>
                          {items?.name || items?.code}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            );
          })}
        </div>
        <div>
          <Form.Item
            name="address"
            label="Հասցե"
            className="w-full mt-[32px]"
            labelCol={{ span: 24 }}>
            <Input className="mb-[32px] " />
          </Form.Item>
        </div>
        <div className="flex flex-col items-start justify-between space-y-[32px]">
          {shipping_details_switches}
        </div>
      </FormItemGroupWrapper>
      <Divider />
    </>
  );
};

export default FormShippingData;
