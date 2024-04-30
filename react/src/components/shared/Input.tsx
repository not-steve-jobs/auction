import className from "classnames";
import { FC, ReactNode, InputHTMLAttributes, Fragment } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  suffix?: ReactNode | string;
  label?: string;
  error?: boolean | number;
}

const Input: FC<IInputProps> = ({ prefix, suffix, label, error, ...rest }) => {
  const classes = className(
    rest.className,
    "outline-none focus:outline-none focus-visible:outline-none border",
    {
      "border-[#F34635]": error
    }
  );

  return (
    <>
      {label?.length && (
        <label htmlFor="" className="font-mardoto text-[14px] font-normal leading-[17px] ">
          {label}
        </label>
      )}
      {prefix ? (
        <div className={"flex items-center relative"}>
          <div className={"absolute left-[16px]"}>{prefix}</div>
          <input {...rest} className={classes} />
        </div>
      ) : suffix ? (
        <div className="flex items-center relative">
          <input {...rest} className={classes} />
          <div className={"absolute right-[16px]"}>{suffix}</div>
        </div>
      ) : (
        <input {...rest} className={classes} />
      )}

      {/*<div*/}
      {/*  className={*/}
      {/*    "w-[52px] h-[52px] flex items-center justify-center bg-[#1F598E] rounded-[3px] "*/}
      {/*  }>*/}
      {/*  <img src="" alt="" />*/}
      {/*</div>*/}
    </>
  );
};

export default Input;
