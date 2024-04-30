import { FC } from "react";
import { Card, Image } from "antd";

import three_dots from "../../../../assets/images/three-dots.svg";
import fallback_image from "../../../../assets/images/fallback.svg";
import { findFirstImageUrl } from "../../../../utils/firstMeetedUrl.util";

const { Meta } = Card;

interface ICreateItemCardProps {
  selected?: boolean;
  name: string;
  desc: string;
  files?: any[];
  size?: { width: string; height: string };
}

const CreateItemCard: FC<ICreateItemCardProps> = ({
  name,
  desc,
  files,
  selected,
  size = { width: "298px", height: "398px" }
}) => {
  let src = "";
  src = findFirstImageUrl(files);

  return (
    <Card
      hoverable
      style={size}
      cover={
        <div style={{ position: "relative" }}>
          {!!selected && (
            <img
              style={{ position: "absolute", right: "16px", top: "20px", zIndex: 10 }}
              alt="example"
              src={three_dots}
            />
          )}
          <Image
            preview={false}
            style={{ width: size.width, height: "auto", objectFit: "cover" }}
            alt="example"
            src={src}
            fallback={fallback_image}
          />
        </div>
      }>
      <Meta title={name} description={desc} />
    </Card>
  );
};

export default CreateItemCard;
