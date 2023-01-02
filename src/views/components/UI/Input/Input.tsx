import cn from "classnames";
import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { translate } from "../../../../locales/translate";
import st from "./Input.module.scss";

interface IProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  errorMsg?: string;
  label?: string;
}

const Input: FC<IProps> = ({ errorMsg, label, ...props }) => {
  return (
    <div className={st.wrapper}>
      {label && <div className={cn(st.label, { [st.error]: !!errorMsg })}>{label}</div>}
      <input className={cn(st.input, { [st.error]: !!errorMsg })} {...props} />
      {errorMsg && <div className="error">{translate({ id: errorMsg as any })}</div>}
    </div>
  );
};

export default Input;
