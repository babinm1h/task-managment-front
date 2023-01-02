import cn from "classnames";
import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren } from "react";
import st from "./Button.module.scss";

interface IProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  fullWidth?: boolean;
}

const Button: FC<PropsWithChildren<IProps>> = ({ children, fullWidth = false, ...props }) => {
  return (
    <button className={cn(st.button, { [st.full]: fullWidth })} {...props}>
      {children}
    </button>
  );
};

export default Button;
