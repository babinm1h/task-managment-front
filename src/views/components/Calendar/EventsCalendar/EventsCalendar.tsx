import React, { FC, useEffect, useMemo, useState } from "react";
import { shouldShowHours, hoursNow } from "../../../../helpers/calendarHelpers";
import { DateHelpers, weekDays } from "../../../../helpers/dateHelpers";
import { notifyError } from "../../../../helpers/toastHelpers";
import { translate } from "../../../../locales/translate";
import {
  TCreateEventArgs,
  useCreateEventMutation,
  useDeleteEventMutation,
  useLazyGetEventsQuery,
} from "../../../../redux/services/events/eventsApi";
import { IEvent } from "../../../../types/entities.types";
import Loader from "../../UI/Loader/Loader";
import st from "./EventsCalendar.module.scss";
import WeekDaysColumns from "./WeekDaysColumns/WeekDaysColumns";

interface IProps {
  currentDay: string;
}

const EventsCalendar: FC<IProps> = ({ currentDay }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [createEvent] = useCreateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const [getEvents, { isLoading }] = useLazyGetEventsQuery();

  const hoursArr = DateHelpers.getHoursArr();

  const currentWeekDays = useMemo(
    () => DateHelpers.getWeekDays(DateHelpers.getDateObj(currentDay).toDate()),
    [currentDay]
  );

  const onCreateEvent = async (eventDto: TCreateEventArgs) => {
    try {
      const event = await createEvent(eventDto).unwrap();
      setEvents((prev) => [...prev, event]);
    } catch (err: any) {
      notifyError(err?.data?.message);
    }
  };

  const onDeleteEvent = async (id: string) => {
    try {
      setEvents((prev) => prev.filter((ev) => ev._id !== id));
      await deleteEvent(id).unwrap();
    } catch (err: any) {
      notifyError(err?.data.message);
    }
  };

  const fetchEvents = async () => {
    try {
      const evs = await getEvents().unwrap();
      if (evs) {
        setEvents(evs);
      }
    } catch (err: any) {
      notifyError(err?.data?.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
        />
      </div>
    </div>
  );
};

export default EventsCalendar;
