import FormItemGroupWrapper from "../../formItems/FormItemGroupWrapper";
import FileUpload from "../../shared/FileUpload/FileUpload";
import { FC, useEffect, useRef, useState } from "react";
import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

interface IImagesAndVideosProps {
  // eslint-disable-next-line no-unused-vars
  onMultimediaChange: (data: { image: UploadFile<RcFile>[]; video: UploadFile<RcFile>[] }) => void;
}

const ImagesAndVideos: FC<IImagesAndVideosProps> = ({ onMultimediaChange }) => {
  const [images, setImages] = useState<UploadFile<RcFile>[]>([]);
  const [videos, setVideos] = useState<UploadFile<RcFile>[]>([]);
  const componentFirsUpdate = useRef<boolean>(true);

  useEffect(() => {
    if (componentFirsUpdate.current) {
      componentFirsUpdate.current = false;
      return;
    }
    const emitObject = { image: images, video: videos };

    onMultimediaChange(emitObject);
  }, [images, videos]);

  return (
    <FormItemGroupWrapper
      title={"Նկարներ և վիդեո"}
      titleInfo={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, iste!"}>
      <div className={"flex gap-x-[32px]"}>
        <FileUpload maxCount={10} onFileChange={setImages} />
        <FileUpload maxCount={1} onFileChange={setVideos} isVideo />
      </div>
    </FormItemGroupWrapper>
  );
};

export default ImagesAndVideos;
