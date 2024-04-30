import { Form, Input, Modal, UploadFile } from "antd";
import FileUpload from "../../shared/FileUpload/FileUpload";
import { FC } from "react";
import Button from "../../shared/Button";
import { addPortfolio } from "../../../services/services.service";
import { RcFile } from "antd/es/upload";
import { objectToFormData } from "../../../utils/object.util";

interface IUploadPortfolioModalProps {
  open: boolean;
  handleCancel: () => void;
  // eslint-disable-next-line no-unused-vars
  handleOk: (data: { [key: string]: any }) => void;
}

const { TextArea } = Input;
const UploadPortfolioModal: FC<IUploadPortfolioModalProps> = ({ open, handleOk, handleCancel }) => {
  const [form] = Form.useForm();

  const handleFileChange = (data: UploadFile<RcFile>[], key: string) => {
    form.setFieldsValue({ [key]: data });
  };

  const handlePortfolioUpload = async () => {
    const fields = ["description", "images", "video"];
    const formValues = form.getFieldsValue(fields);

    const payload = objectToFormData(formValues);

    try {
      const res = await addPortfolio(payload);

      clearFields();
      handleOk(res);
    } catch (e) {
      return e;
    }
  };

  const clearFields = () => {
    const fields = ["description", "multimedia-images", "multimedia-video"];

    form.resetFields(fields);
  };

  return (
    <Modal
      title={"Թղթապանակ"}
      open={open}
      onCancel={handleCancel}
      className={"!w-[800px]"}
      styles={{ body: { height: 800 } }}
      footer={[
        <div key={1} className={"flex justify-end"}>
          <Button
            hover
            className={
              "w-[126px] h-[37px] flex items-center justify-center text-[14px] font-medium font-mardoto leading-normal rounded-[3px] text-white bg-[#1F598E]"
            }
            onClick={handlePortfolioUpload}>
            Պահպանել
          </Button>
        </div>
      ]}>
      <h6
        className={"mb-[44px] text-[#404953] font-mardoto text-[14px] leading-[22px] font-normal"}>
        Պորտֆոլիոյում ավելացրեք նախկինում կատարած ձեր աշխատանքը
      </h6>

      <Form form={form} className={"flex flex-col gap-y-[34px]"}>
        <div>
          <Form.Item
            name={"description"}
            label={
              <label
                className={"text-[14px] font-mardoto text-[#404953] font-normal leading-normal"}>
                Նկարագրություն
              </label>
            }
            labelCol={{
              span: 24
            }}>
            <TextArea
              className={"text-[#232323] !min-h-[96px] !border-[#404953]"}
              maxLength={500}
              placeholder={"Նկարագրեք կատարած աշխատանքը"}
            />
          </Form.Item>
        </div>

        <div className={"flex gap-x-[32px]"}>
          <Form.Item name={"multimedia-images"}>
            <FileUpload onFileChange={(data) => handleFileChange(data, "images")} />
          </Form.Item>
          <Form.Item name={"multimedia-video"}>
            <FileUpload isVideo onFileChange={(data) => handleFileChange(data, "video")} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default UploadPortfolioModal;
