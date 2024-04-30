import { FC, useContext } from "react";
import { Form, Input } from "antd";
import FormItemGroupWrapper from "../../formItems/FormItemGroupWrapper";
import CategorySelect from "../CategorySelect";
import ServiceContext from "../../../context/service-context";

const { TextArea } = Input;

interface IBasicDataProps {
  // eslint-disable-next-line no-unused-vars
  emitChosenCategory: (id: number | string | undefined) => void;
}

const BasicData: FC<IBasicDataProps> = ({ emitChosenCategory }) => {
  const { serviceCategoryData } = useContext(ServiceContext);

  const categoryChangeHandler = (id: number | string | undefined) => {
    emitChosenCategory(id);
  };

  return (
    <FormItemGroupWrapper title={"Հիմնական տվյալներ"}>
      <div className={"flex flex-col gap-y-[24px]"}>
        <Form.Item
          name={"category"}
          label={
            <label className={"text-[14px] font-mardoto text-[#404953] font-normal leading-normal"}>
              Կատեգորիա
            </label>
          }
          labelCol={{
            span: 24
          }}>
          <CategorySelect data={serviceCategoryData} onCategoryChange={categoryChangeHandler} />
        </Form.Item>
        <Form.Item
          name={"description"}
          label={
            <label className={"text-[14px] font-mardoto text-[#404953] font-normal leading-normal"}>
              Նկարագրություն
            </label>
          }
          labelCol={{
            span: 24
          }}>
          <TextArea className={"text-[#232323] !min-h-[96px]"} maxLength={2000} />
        </Form.Item>
      </div>
    </FormItemGroupWrapper>
  );
};

export default BasicData;
