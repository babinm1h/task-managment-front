import { FC, useMemo } from "react";
import { shouldShowHours, hoursNow } from "../../../../helpers/calendarHelpers";
import { DateHelpers, weekDays } from "../../../../helpers/dateHelpers";
import { useEventsCalendar } from "../../../../hooks/components/useEventsCalendar";
import { translate } from "../../../../locales/translate";
import Loader from "../../UI/Loader/Loader";
import st from "./EventsCalendar.module.scss";
import WeekDaysColumns from "./WeekDaysColumns/WeekDaysColumns";

interface IProps {
  currentDay: string;
}

const EventsCalendar: FC<IProps> = ({ currentDay }) => {
  const { events, hoursArr, isLoading, onCreateEvent, onDeleteEvent, onUpdateEvent } = useEventsCalendar();

  const currentWeekDays = useMemo(
    () => DateHelpers.getWeekDays(DateHelpers.getDateObj(currentDay).toDate()),
    [currentDay]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={st.container}>
      <div className={st.header}>
        <div className={st.weekDays}>
          <div className={st.empty} />
          {currentWeekDays.map((d, idx) => (
            <div key={idx} className={st.weekDay}>
              <span className={st.dayNum}>{d.format("DD")}</span>
              <span>{translate({ id: weekDays[idx] as any })}</span>
            </div>
          ))}
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
        <WeekDaysColumns
          currentWeekDays={currentWeekDays}
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

export default EventsCalendar;
