import { useState } from "react";
import { Divider, Form, Select } from "antd";

import constants from "../../../auth/constants";
import FormItemGroupWrapper from "../../../formItems/FormItemGroupWrapper";
import SalesDataItems from "./SalesDataItems";
const { Option } = Select;

const { SALES_DATA } = constants;

const FormSaleDatas = () => {
  const [saleType, setSaleType] = useState("");
  const handleChange = (val: string) => {
    setSaleType(val);
  };

  return (
    <>
      <FormItemGroupWrapper title={"Վաճառքի տվյալներ"} titleInfo="Վաճառքի տվյալներ">
        <div className="flex flex-col items-start justify-center ">
          {SALES_DATA.map((item) => (
            <Form.Item
              {...item}
              key={item.key}
              initialValue={saleType}
              className="w-[680px]"
              // style={{ width: "680px", margin: "31px 0" }}
              labelCol={{ span: 24 }}>
              <Select onChange={handleChange} placeholder={item.placeholder}>
                {/* TODO */}
                <Option value="auction"> Աուկցիոն</Option>
                <Option value="oneTimeSale">Ուղիղ վաճառք</Option>
              </Select>
            </Form.Item>
          ))}
          <SalesDataItems saleType={saleType} />
        </div>
      </FormItemGroupWrapper>
      <Divider />
    </>
  );
};

export default FormSaleDatas;
