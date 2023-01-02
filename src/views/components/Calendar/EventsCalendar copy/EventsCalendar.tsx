import { FC } from "react";
import { shouldShowHours, hoursNow } from "../../../../helpers/calendarHelpers";
import { DateHelpers } from "../../../../helpers/dateHelpers";
import { useEventsCalendar } from "../../../../hooks/components/useEventsCalendar";
import { translate } from "../../../../locales/translate";
import Loader from "../../UI/Loader/Loader";
import st from "./EventsCalendar.module.scss";
import DayEventsRows from "./WeekDaysColumns/DayEventsRows";

interface IProps {
  currentDay: string;
}

const EventsCalendarMobile: FC<IProps> = ({ currentDay }) => {
  const { events, hoursArr, isLoading, onCreateEvent, onDeleteEvent, onUpdateEvent } = useEventsCalendar();

  const currDayDate = DateHelpers.getDateObj(currentDay);
  const nameOfDay = DateHelpers.getWeekDay(currDayDate.toDate());

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={st.container}>
      <div className={st.header}>
        <div className={st.weekDays}>
          <div className={st.empty} />
          <div className={st.weekDay}>
            <span className={st.dayNum}>{currDayDate.format("DD")}</span>
            <span>{translate({ id: nameOfDay as any })}</span>
          </div>
        </div>
      </div>
      <div className={st.body}>
        <div className={st.hoursCol}>
          {hoursArr.map((hr) => (
            <div className={st.hour} key={hr}>
              {shouldShowHours(hr) ? hr : null}
            </div>
          ))}
        </div>
        <DayEventsRows
          currentDay={currDayDate}
          hoursArr={hoursArr}
          hoursNow={hoursNow}
          events={events}
          onCreateEvent={onCreateEvent}
          onDeleteEvent={onDeleteEvent}
          onUpdateEvent={onUpdateEvent}
        />
      </div>
    </div>
  );
};

export default EventsCalendarMobile;
