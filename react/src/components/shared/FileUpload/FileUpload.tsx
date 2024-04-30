import { PlusCircleOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import { UploadFile, UploadProps } from "antd";
import { Button, Upload } from "antd";
import "./FileUpload.css";
import photoIcon from "../../../assets/images/photo.svg";
import videoIcon from "../../../assets/images/video.svg";
import { RcFile } from "antd/es/upload";

interface IFileUploadProps extends UploadProps {
  isVideo?: boolean;
  // eslint-disable-next-line no-unused-vars
  onFileChange: (data: UploadFile<RcFile>[]) => void;
}
const FileUpload: FC<IFileUploadProps> = ({ isVideo, onFileChange, ...attributes }) => {
  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);

  const props: UploadProps = {
    ...attributes,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: RcFile) => {
      setFileList([...fileList, file]);
      onFileChange([...fileList, file]);

      return false;
    },
    fileList
  };

  const acceptType = isVideo ? "video/*" : "image/*";

  return (
    <Upload {...props} accept={acceptType}>
      <Button className="fileUploadButton">
        <div className="uploadTitle">
          <PlusCircleOutlined />
          {isVideo ? "Տեսանյութ" : "Նկար"}
        </div>
        {isVideo ? <img src={videoIcon} /> : <img src={photoIcon} />}
      </Button>
    </Upload>
  );
};

export default FileUpload;
