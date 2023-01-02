import { useMemo, useState } from "react";
import { DateHelpers } from "../../../helpers/dateHelpers";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import Aside from "./Aside/Aside";
import st from "./Calendar.module.scss";
import EventsCalendarMobile from "./EventsCalendar copy/EventsCalendar";
import EventsCalendar from "./EventsCalendar/EventsCalendar";

const dateNow = DateHelpers.getDateObj().format("MM DD YY");
const monthNow = new Date().getMonth();

const Calendar = () => {
  const showMobileVersion = useMediaQuery("(max-width: 1024px)");
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

      {showMobileVersion ? (
        <EventsCalendarMobile currentDay={currentDay} />
      ) : (
        <EventsCalendar currentDay={currentDay} />
      )}
    </div>
  );
};

export default Calendar;
