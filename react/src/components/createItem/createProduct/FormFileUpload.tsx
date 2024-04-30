import { Form } from "antd";
import FormItemGroupWrapper from "../../formItems/FormItemGroupWrapper";
import FileUpload from "../../shared/FileUpload/FileUpload";
import { productState } from "../../../context/product-context";

const FormFileUpload = () => {
  const { changeImageData, changeVideoData } = productState();
  return (
    <FormItemGroupWrapper title={"Նկարներ և վիդեո"}>
      <div className="flex items-center justify-start space-x-[32px]">
        <Form.Item name="file">
          <FileUpload
            onFileChange={(data) => {
              changeImageData(data);
            }}
          />
        </Form.Item>
        <Form.Item name="video">
          <FileUpload
            isVideo
            onFileChange={(data) => {
              changeVideoData(data);
            }}
          />
        </Form.Item>
      </div>
    </FormItemGroupWrapper>
  );
};

export default FormFileUpload;
