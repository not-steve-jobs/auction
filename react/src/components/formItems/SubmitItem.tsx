import { FC } from "react";
import Button from "../shared/Button";
import { Form } from "antd";

interface ISubmitItemProps {
  info: string;
  title: string;
  submitText: string;
  description: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (status: string) => void;
}

const SubmitItem: FC<ISubmitItemProps> = ({ info, title, onSubmit, submitText, description }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <p className=" font-mardoto text-[32px] leading-[30px] font-bold  pb-[8px]">{title}</p>
      <p className=" text-[#404953]  font-mardoto text-[14px] leading-[20px] font-normal ">
        {description}
      </p>
      <div className="w-full flex flex-col justify-center items-center py-[64px] px-[115px]">
        <Form.Item className="w-full">
          <Button
            onClick={() => {
              onSubmit("available");
            }}
            type="submit"
            hover
            primary
            className="mb-[32px] w-full flex justify-center items-center rounded-[3px]">
            {submitText}
          </Button>
        </Form.Item>
        <div className="w-full flex justify-center items-center space-x-[12px]">
          <Form.Item className={"w-full"}>
            <Button
              onClick={() => {
                onSubmit("draft");
              }}
              hover
              outline
              className={"w-full flex items-center justify-center rounded-[3px]"}>
              Պահպանել սևագիր տարբերակ
            </Button>
          </Form.Item>
          <Form.Item className={"w-full"}>
            <Button
              hover
              outline
              className={"w-full flex items-center justify-center rounded-[3px]"}>
              Նախնական դիտում
            </Button>
          </Form.Item>
        </div>
      </div>

      <p className=" font-mardoto text-[16px] leading-[19px] font-bold  pb-[8px]">
        Կարևոր է իմանալ
      </p>
      <p className="text-[#404953]  font-mardoto text-[14px] leading-[20px] font-normal ">{info}</p>
    </div>
  );
};

export default SubmitItem;
