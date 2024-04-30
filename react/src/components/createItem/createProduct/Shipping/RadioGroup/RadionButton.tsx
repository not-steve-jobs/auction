import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";

import Radio from "antd/lib/radio";
// import "antd/dist/antd.css";
import "./radioButton.css";
import { Form } from "antd";

const RadioButton = () => {
  return (
    <div className="App">
      <Form.Item
        name="delivery_pay_method"
        tooltip={{ title: "Tooltip with customize icon", icon: <InfoCircleOutlined /> }}
        label={<p className=" text-[14px]">Առաքման համար վճարելու է</p>}>
        <Radio.Group className="radio-custom">
          <Radio value="buyer">Գնորդը</Radio>
          <Radio value="seller">Վաճառողը (դուք)</Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  );
};
export default RadioButton;
