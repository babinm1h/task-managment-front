import React, { FC } from "react";
import st from "./Toggle.module.scss";

interface IProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onToggle?: () => void;
}

const Toggle: FC<IProps> = ({ ...props }) => {
  return (
    <label className={st.toggle} htmlFor={"toggle"}>
      <input type="checkbox" {...props} hidden className={st.input} id="toggle" />
      <span className={st.thumb} />
      <span className={st.track} />
    </label>
  );
};

export default Toggle;
