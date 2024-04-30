import { Button, Form, Input, Modal } from "antd";
import { FC } from "react";

interface ITempleteModalProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  // eslint-disable-next-line no-unused-vars
  onChangeTable: (name: string) => void | any;
}
const TempleteModal: FC<ITempleteModalProps> = ({
  open,
  handleOk,
  handleCancel,
  onChangeTable
}) => {
  return (
    <Modal
      //   cancelButtonProps={}
      cancelText="Չեղարկել"
      okText="Հաստատել"
      open={open}
      title={
        <p className=" font-mardoto text-[#232323] text-[28px] leading-[30px] font-medium">
          Ձևանմուշ
        </p>
      }
      footer={[
        <Button className="border border-[#144272] " key="back" onClick={handleCancel}>
          <p className=" font-mardoto text-[#144272] leading-[16px] text-[14px]">Չեղարկել</p>
        </Button>,
        <Button className="bg-[#144272] text-[#fff]" key="submit" onClick={handleOk}>
          <p className=" font-mardoto text-[#fff] leading-[16px] text-[14px]">Հաստատել</p>
        </Button>
      ]}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Form.Item
        labelCol={{ span: 24 }}
        label="Ձևանմուշի անվանում"
        rules={[{ required: true, message: "Ձևանմուշի անվանում դաշտրը պարտադիր է" }]}>
        <Input
          onChange={(e) => {
            onChangeTable(e.target.value);
          }}
          showCount
          maxLength={40}
        />
      </Form.Item>
    </Modal>
  );
};

export default TempleteModal;
