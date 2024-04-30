import classNames from "classnames";
import className from "classnames";

const TEXT_BASE_CLASSES = classNames(
  "text-[#101B28CC] font-mardoto text-center text-[14px] font-normal"
);

const RESEND_BUTTON_CLASSES = classNames(
  "w-[300px] md:w-[343px] py-[12px] text-[#144272] mx-auto mt-[60px] flex justify-center text-center rounded-[1000px] bg-[#F0F3FF] text-[16px] font-semibold leading-[20px] shadow-[0px_1px_3px_1px_rgba(0, 0, 0, 0.15)] hover:shadow-[0px_1px_3px_1px_rgba(244,180,5, 0.15)]"
);

const AUTH_FOOTER_LIST_CLASSES = classNames(
  "font-mardoto text-[10px] mx-[8px] font-normal leading-[12px]"
);

const VERIFICATION_INPUT_BASE_CLASSES = classNames(
  "w-[45px] md:min-w-[60px] h-[45px] md:min-h-[60px] outline-none text-center font-mardoto text-[20px] border rounded-lg border-[#667085] bg-[#fff]"
);

const ERROR_TEXT_BASE_CLASSES = classNames(
  "text-[10px] mt-[8px] font-mardoto text-[#F34635] font-normal"
);

const INPUT_BASE_CLASSES = className(
  "border border-[#667085] w-[300px] md:w-[415px] h-[52px] rounded-[6px] px-[10px]"
);
const VALIDATION_TEXT_CLASS = className(
  "font-mardoto font-[400] text-[16px] text-[#101B28] opacity-[80%] "
);
const DISABLED_BUTTON = className(
  "bg-[#CCCCCD] w-[168px] text-[#8A898C] font-mardoto text-[16px] leading-[20px] py-[12px] font-semibold justify-center"
);
const ENABLED_BUTTON = className(
  "bg-[#1F598E] w-[168px] text-[#FFF] font-mardoto text-[16px] leading-[20px] py-[12px] font-semibold justify-center"
);

export default {
  ENABLED_BUTTON,
  DISABLED_BUTTON,
  TEXT_BASE_CLASSES,
  INPUT_BASE_CLASSES,
  RESEND_BUTTON_CLASSES,
  VALIDATION_TEXT_CLASS,
  ERROR_TEXT_BASE_CLASSES,
  AUTH_FOOTER_LIST_CLASSES,
  VERIFICATION_INPUT_BASE_CLASSES
};
