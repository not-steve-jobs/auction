import React, { FC, HTMLAttributes } from "react";
import PlusIcon from "../../../assets/images/plus_icon.svg";

const PlusButton: FC<HTMLAttributes<HTMLDivElement>> = ({ ...attr }) => {
  return (
    <div {...attr}>
      <img src={PlusIcon} alt="plus_icon" />
    </div>
  );
};

export default PlusButton;
