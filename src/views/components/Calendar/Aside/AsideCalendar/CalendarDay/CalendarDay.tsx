import classNames from "classnames";
import { Dayjs } from "dayjs";
import { FC } from "react";
import st from "../AsideCalendar.module.scss";

interface IDayProps {
  day: Dayjs;
  isActive: boolean;
  isDisabled: boolean;
  onDayClick: (day: string) => void;
}

export const CalendarDay: FC<IDayProps> = ({ day, isActive, isDisabled, onDayClick }) => {
  const handlePickDay = () => {
    onDayClick(day.format("MM DD YY"));
  };

  return (
    <div
      onClick={handlePickDay}
      className={classNames(st.day, {
        [st.disabled]: isDisabled,
        [st.active]: isActive,
      })}
    >
      {day.format("DD")}
    </div>
  );
};
