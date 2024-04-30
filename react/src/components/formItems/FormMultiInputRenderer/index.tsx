import React, { FC } from "react";
import MultiInput from "./InputMultiRenderer";
import SocialMediaMultiInputRenderer from "./SocialMediaMultiInputRenderer";

interface IFormMultiInputRendererProps {
  required?: boolean;
  inputType: "phone" | "email" | "socialMedia";
  // eslint-disable-next-line no-unused-vars
  emitInputsData: (data: string | string[] | { [key: string]: string }[]) => void;
}

const FormMultiInputRenderer: FC<IFormMultiInputRendererProps> = ({
  inputType,
  emitInputsData,
  required
}) => {
  const handleEmittedDataFromChild = (data: string | string[] | { [key: string]: string }[]) => {
    emitInputsData(data);
  };

  const multiInputConfig = {
    phone: (
      <MultiInput
        required={required}
        inputType={"phone"}
        emitInputsData={handleEmittedDataFromChild}
      />
    ),
    email: (
      <MultiInput
        required={required}
        inputType={"email"}
        emitInputsData={handleEmittedDataFromChild}
      />
    ),
    socialMedia: (
      <SocialMediaMultiInputRenderer
        required={required}
        emitSocialMediaMultiInputData={handleEmittedDataFromChild}
      />
    )
  };

  return multiInputConfig[inputType];
};

export default FormMultiInputRenderer;
