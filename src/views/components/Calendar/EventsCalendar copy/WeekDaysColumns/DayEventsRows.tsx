import { Dayjs } from "dayjs";
import React, { FC } from "react";
import { DateHelpers } from "../../../../../helpers/dateHelpers";
import { TCreateEventArgs, TUpdateEventArgs } from "../../../../../redux/services/events/eventsApi";
import { IEvent } from "../../../../../types/entities.types";
import WeekDayColumn from "./WeekDayColumn";
import st from "./DayEventsRows.module.scss";

interface IProps {
  currentDay: Dayjs;
  hoursArr: string[];
  hoursNow: string;
  events: IEvent[];
  onDeleteEvent: (id: string) => void;
  onCreateEvent: (ev: TCreateEventArgs) => void;
  onUpdateEvent: (dto: TUpdateEventArgs) => void;
}

const secsInDay = 86400;

const DayEventsRows: FC<IProps> = ({
  currentDay,
  hoursArr,
  hoursNow,
  events,
  onCreateEvent,
  onDeleteEvent,
  onUpdateEvent,
}) => {
  const linePos = (DateHelpers.hoursToSeconds(hoursNow) / secsInDay) * 100;
  const dayEvents = events.filter((e) => e.date === currentDay.format("MM DD YY"));
  return (
    <div className={st.weekDaysColumns}>
      <div className={st.redline} style={{ top: `${linePos || 0}%` }} />
      <span className={st.timeNow} style={{ top: `${linePos || 0}%` }}>
        {hoursNow}
      </span>

      <WeekDayColumn
        hoursArr={hoursArr}
        day={currentDay}
        events={dayEvents}
        onCreateEvent={onCreateEvent}
        onDeleteEvent={onDeleteEvent}
        onUpdateEvent={onUpdateEvent}
      />
    </div>
  );
};

export default DayEventsRows;
