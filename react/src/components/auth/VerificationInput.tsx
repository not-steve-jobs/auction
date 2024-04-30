// hooks
import { useRef } from "react";

// types
import { FC, ClipboardEvent, KeyboardEvent, FormEvent, RefObject } from "react";

// constants
import constants from "./constants";

interface IVerificationInputProps {
  error: string;
  // eslint-disable-next-line no-unused-vars
  setError: (error: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleCodeCheck: (value: string) => void;
}

// eslint-disable-next-line no-unused-vars
type KeyHandler = (e: KeyboardEvent<HTMLInputElement>, index: number) => void;

const { ERROR_TEXT_BASE_CLASSES, VERIFICATION_INPUT_BASE_CLASSES } = constants;
// TODO => check typeof inputRefs
const VerificationInput: FC<IVerificationInputProps> = ({ error, handleCodeCheck, setError }) => {
  const inputs: (HTMLInputElement | null)[] = Array.from({ length: 6 });
  const inputRefs: any = inputs.map(() => useRef(null));

  const KEY_HANDLERS: { [key: number]: KeyHandler } = {
    [8]: (e, index) => handleBackspace(e, index),
    [37]: (e, index) => handleArrowLeft(e, index),
    [39]: (e, index) => handleArrowRight(e, index)
  };

  const handleInput = (e: FormEvent<HTMLInputElement> | any, index: number) => {
    const { value } = e.target;

    setError("");

    if (value === " ") return;

    if (value && index < inputs.length - 1) {
      if (inputRefs[index]?.current && inputRefs[index + 1]?.current) {
        inputRefs[index].current.value = value;
        inputRefs[index + 1].current.focus();
      }
    }

    const values = getInputValues();

    if (values.length !== inputRefs.length) return;

    handleCodeCheck(values);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const pasteValues = paste.split("").slice(0, inputs.length);

    pasteValues.forEach((value, index) => {
      inputRefs[index].current.value = value;
    });

    const values = getInputValues();

    if (values.length !== inputRefs.length) return;

    handleCodeCheck(values);
  };

  const handleBackspace: KeyHandler = (e, index) => {
    setError("");

    if (inputRefs[index].current.value === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    } else if (inputRefs[index].current.value !== "") {
      inputRefs[index].current.value = "";
    }
  };

  const handleArrowLeft: KeyHandler = (e, index) => {
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleArrowRight: KeyHandler = (e, index) => {
    if (index < inputs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown: KeyHandler = (e, index) => {
    const action = KEY_HANDLERS[e.keyCode];

    if (action) {
      action(e, index);
    }
  };

  const getInputValues = () => {
    return inputRefs
      .map((item: RefObject<HTMLInputElement> | any) =>
        item.current.value && item.current.value !== " " ? item.current.value : null
      )
      .filter((item: any) => item)
      .join("");
  };

  return (
    <form>
      <div className="w-[300px] md:min-w-[424px] lg:min-w-[415px] flex items-center justify-between">
        {inputs.map((_, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="tel"
            maxLength={1}
            pattern="[0-9]"
            className={`${VERIFICATION_INPUT_BASE_CLASSES} ${error ? "border-[#F34635]" : ""}`}
            onInput={(e) => handleInput(e, index)}
            onPaste={handlePaste}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      {error && <div className={ERROR_TEXT_BASE_CLASSES}>{error}</div>}
    </form>
  );
};

export default VerificationInput;
