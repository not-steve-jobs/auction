import React, { FC, HTMLAttributes } from "react";
import MinusIcon from "../../../assets/images/minus_icon.svg";

const MinusButton: FC<HTMLAttributes<HTMLDivElement>> = ({ ...attr }) => {
  return (
    <div {...attr}>
      <img src={MinusIcon} alt="minus_icon" />
    </div>
  );
};

export default MinusButton;
