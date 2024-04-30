import { Form } from "antd";
import React, { FC, ReactNode } from "react";

import FormHeader from "./FormHeader";

interface IFormWrapperProps {
  children?: ReactNode;
  title?: string;
  form: {};
  description?: string;
  onFinish?: any;
}
const FormWrapper: FC<IFormWrapperProps> = ({ children, title, description, onFinish }) => {
  const [form] = Form.useForm();

  const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
    <>
      {label}
      {required ? (
        <span className="text-[#DC4536] text-[14px] font-mardoto leading-4 ml-[2px]">*</span>
      ) : (
        ""
      )}
    </>
  );
  return (
    <Form
      form={form}
      requiredMark={customizeRequiredMark}
      className="sm:max-w-full min-h-screen relative w-[990px]  bg-white mx-auto mt-[10px]"
      onFinish={onFinish}>
      <FormHeader />

      <h1
        className={` font-mardoto text-[#232323] text-[42px] leading-[49px] font-medium  ${
          description ? "mb-[32px]" : "mb-[64px]"
        }`}>
        {title}
      </h1>
      {!!description && (
        <p className=" font-mardoto text-[14px] text-[#404953] leading-[19.6px] font-normal mb-[32px]">
          {description}
        </p>
      )}

      {children}
    </Form>
  );
};

export default FormWrapper;
