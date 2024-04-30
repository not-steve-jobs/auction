import { HTMLAttributes, ReactNode } from "react";

interface IErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  err_if: boolean;
  children: ReactNode;
}

const ErrorMessage = ({ err_if, children, ...rest }: IErrorMessageProps) => {
  if (!err_if) return <></>;

  return (
    <div
      {...rest}
      className={`text-[10px] mt-[8px] font-mardoto text-[#F34635] font-normal ${rest.className}`}>
      {children}
    </div>
  );
};

export default ErrorMessage;
