import React, { FC } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { translate } from "../../../../locales/translate";
import "./Datepicker.scss";

interface IProps extends ReactDatePickerProps {
  startDate: Date;
  onChange(date: Date | null, event: React.SyntheticEvent<any, Event> | undefined): void;
  label: string;
  errorMsg?: string;
}

const Datepicker: FC<IProps> = ({ startDate, onChange, label, errorMsg, ...props }) => {
  return (
    <div className="picker__wrapper">
      {label ? <div className="picker__label"> {label}</div> : null}
      <DatePicker selected={startDate} onChange={onChange} className="picker" {...props} />
      {errorMsg && <div className="error">{translate({ id: errorMsg as any })}</div>}
    </div>
  );
};

export default Datepicker;
