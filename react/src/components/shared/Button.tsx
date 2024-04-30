import className from "classnames";
import { FC, ReactNode, ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hover?: boolean;
  active?: boolean;
  primary?: boolean;
  outline?: boolean;
  rounded?: boolean;
  children?: ReactNode;
}

const Button: FC<IButtonProps> = ({
  hover,
  active,
  primary,
  outline,
  rounded,
  children,
  disabled,
  ...rest
}) => {
  const classes = className(rest.className, "flex items-center px-3 py-1.5 border font-mardoto", {
    "rounded-full": rounded,
    "bg-[#1F598E] text-white": primary,
    "bg-[#B3B3B3] text-[#8A898C]": disabled,
    "border-[#144272] bg-white text-[#144272]": outline,
    "active::bg-[#F4B405] active:text-[#fff]": active && !disabled,
    "hover:bg-[#F4B405] hover:border-[#F4B405] hover:text-[#fff] transition duration-200":
      hover && !disabled
  });

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

export default Button;
