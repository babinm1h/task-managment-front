import React, { FC } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../../assets/icons";
import { DateHelpers, weekDays } from "../../../../../helpers/dateHelpers";
import { translate } from "../../../../../locales/translate";
import { CalendarDay } from "./CalendarDay/CalendarDay";
import st from "./AsideCalendar.module.scss";
import { Dayjs } from "dayjs";

interface IProps {
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentMonth: number;
  monthDays: Dayjs[][];
  currentDay: string;
  onDayPick: (day: string) => void;
}

const AsideCalendar: FC<IProps> = ({ setCurrentMonth, currentMonth, monthDays, currentDay, onDayPick }) => {
  const monthAndYear = DateHelpers.getMonthName(currentMonth, true);

  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev + 1);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev - 1);
  };

  return (
    <div className={st.calendar}>
      <div className={st.header}>
        <button onClick={handlePrevMonth}>
          <ArrowLeftIcon size={18} />
        </button>
        <span className={st.currMonth}>{monthAndYear}</span>
        <button onClick={handleNextMonth}>
          <ArrowRightIcon size={18} />
        </button>
      </div>
      <WeekDaysRow />
      {monthDays.map((week, idx) => (
        <div className={st.weekRow} key={idx}>
          {week.map((day) => {
            const formatedDay = day.format("MM DD YY");
            return (
              <CalendarDay
                day={day}
                key={formatedDay}
                isDisabled={DateHelpers.getMonthName(currentMonth) !== day.format("MMMM")}
                isActive={formatedDay === currentDay}
                onDayClick={onDayPick}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default AsideCalendar;

const WeekDaysRow = () => {
  return (
    <div className={st.weekRow}>
      {weekDays.map((day) => (
        <div className={st.weekDay} key={day}>
          {translate({ id: day as any })}
        </div>
      ))}
    </div>
  );
};
