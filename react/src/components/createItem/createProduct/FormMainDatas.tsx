import TextArea from "antd/es/input/TextArea";

import { Divider, Form, Input, Select } from "antd";

import constants from "../../auth/constants";
import CategorySelect from "../../service/CategorySelect";
import { productState } from "../../../context/product-context";
import FormItemGroupWrapper from "../../formItems/FormItemGroupWrapper";

const { Option } = Select;

const { MAIN_DATAS } = constants;

const FormMainDatas = () => {
  const { initialCategories, latestCategories } = productState();

  const categoryData = [[...initialCategories], ...latestCategories];

  const mainDatas = MAIN_DATAS?.map((item) => {
    return (
      <Form.Item
        {...item}
        rules={[{ required: item.required, message: item.message }]}
        // className="w-full"
        style={{ width: "100%", marginTop: "31px" }}
        key={item.key}
        labelCol={{ span: 24 }}>
        {item.type === "Select" && item.key == "condition" ? (
          <Select
            className={item.className}
            placeholder={item.placeholder}
            bordered={item.bordered == "true"}>
            {/* TODO */}
            <>
              <Option value="used">Օգտագործված</Option>
              <Option value="new">Նոր</Option>
            </>
          </Select>
        ) : item.type === "Select" && item.key == "category" ? (
          <CategorySelect data={categoryData} isProducts onCategoryChange={() => {}} />
        ) : item.type === "Input" ? (
          <Input {...item.attrs} />
        ) : item.type === "Textarea" ? (
          <TextArea {...item.attrs} rows={4} />
        ) : (
          <div></div>
        )}
      </Form.Item>
    );
  });
  return (
    <>
      <FormItemGroupWrapper title={"Հիմնական տվյալներ"} titleInfo="Հիմնական տվյալներ">
        <div className="flex flex-col items-start justify-center">{mainDatas}</div>
      </FormItemGroupWrapper>

      <Divider />
    </>
  );
};

export default FormMainDatas;
