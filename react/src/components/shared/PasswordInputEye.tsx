import { FC, useState } from "react";

import visible_eye from "../../assets/images/eye.svg";
import visibility_off_eye from "../../assets/images/eye-visibility_off.svg";

interface InputPasswordEyeProps {
  // eslint-disable-next-line no-unused-vars
  onToggle: (type: string) => void;
}

const InputPasswordEye: FC<InputPasswordEyeProps> = ({ onToggle }) => {
  const [hiddenEye, setHiddenEye] = useState(false);

  const handleClick = () => {
    setHiddenEye((prev) => !prev);
    onToggle(!hiddenEye ? "text" : "password");
  };

  return (
    <img
      onClick={handleClick}
      className={"cursor-pointer w-[24px] h-[24px]"}
      alt={hiddenEye ? "visibility_off_eye" : "eye"}
      src={hiddenEye ? visibility_off_eye : visible_eye}
    />
  );
};

export default InputPasswordEye;
