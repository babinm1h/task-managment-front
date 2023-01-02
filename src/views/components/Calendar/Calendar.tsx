import { useMemo, useState } from "react";
import { DateHelpers,  } from "../../../helpers/dateHelpers";
import Aside from "./Aside/Aside";
import st from "./Calendar.module.scss";
import EventsCalendar from "./EventsCalendar/EventsCalendar";

const dateNow = DateHelpers.getDateObj().format("MM DD YY");
const monthNow = new Date().getMonth();

const Calendar = () => {
  const [currentDay, setCurrentDay] = useState(dateNow);
  const [currentMonth, setCurrentMonth] = useState(monthNow);

  const monthDays = useMemo(() => DateHelpers.getMonthDays(currentMonth), [currentMonth]);

  const onDayPick = (day: string) => {
    setCurrentDay(day);
  };

  return (
    <div className={st.wrapper}>
      <Aside
        setCurrentMonth={setCurrentMonth}
        currentMonth={currentMonth}
        monthDays={monthDays}
        currentDay={currentDay}
        onDayPick={onDayPick}
      />

      <EventsCalendar currentDay={currentDay} />
    </div>
  );
};

export default Calendar;
