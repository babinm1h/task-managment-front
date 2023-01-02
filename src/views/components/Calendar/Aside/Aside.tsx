import { Dayjs } from "dayjs";
import React, { FC } from "react";
import st from "./Aside.module.scss";
import AsideCalendar from "./AsideCalendar/AsideCalendar";

interface IProps {
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentMonth: number;
  monthDays: Dayjs[][];
  currentDay: string;
  onDayPick: (day: string) => void;
}

const Aside: FC<IProps> = ({ setCurrentMonth, currentMonth, monthDays, currentDay, onDayPick }) => {
  return (
    <div className={st.aside}>
      <AsideCalendar
        onDayPick={onDayPick}
        setCurrentMonth={setCurrentMonth}
        currentMonth={currentMonth}
        monthDays={monthDays}
        currentDay={currentDay}
      />
    </div>
  );
};

export default Aside;
