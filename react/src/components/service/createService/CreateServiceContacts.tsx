import FormMultiInputRenderer from "../../formItems/FormMultiInputRenderer";
import FormItemGroupWrapper from "../../formItems/FormItemGroupWrapper";
import { Form, Input } from "antd";
import { FC } from "react";

interface ICreateServiceContactsProps {
  // eslint-disable-next-line no-unused-vars
  onContactsInfoChange: (data: any, key: string) => void;
}

const CreateServiceContacts: FC<ICreateServiceContactsProps> = ({ onContactsInfoChange }) => {
  const handleChange = (data: any, key: string) => {
    onContactsInfoChange(data, key);
  };

  return (
    <FormItemGroupWrapper
      title={"Կոնտակտային տվյալներ"}
      titleInfo={
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, exercitationem."
      }>
      <div className={"flex flex-col gap-y-[24px]"}>
        <Form.Item
          label={
            <label className={"text-[14px] font-mardoto text-[#404953] font-normal leading-normal"}>
              Կոնտակտային անձ <span className={"text-[#DC4536]"}>*</span>
            </label>
          }
          labelCol={{
            span: 24
          }}>
          <Input
            className={
              "w-[680px] h-[52px] border border-[#667085] rounded-[6px] text-[#232323] text-[14px] font-mardoto leading-normal px-[10px]"
            }
            onChange={(event) => handleChange(event.target.value, "contact_person")}></Input>
        </Form.Item>
        <FormMultiInputRenderer
          required
          inputType={"phone"}
          emitInputsData={(data) => handleChange(data, "phones")}
        />
        <FormMultiInputRenderer
          inputType={"email"}
          emitInputsData={(data) => handleChange(data, "emails")}
        />
        <FormMultiInputRenderer
          inputType={"socialMedia"}
          emitInputsData={(data) => handleChange(data, "links")}
        />
      </div>
    </FormItemGroupWrapper>
  );
};

export default CreateServiceContacts;
