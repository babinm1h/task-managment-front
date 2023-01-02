import { Dayjs } from "dayjs";
import React, { FC } from "react";
import { DateHelpers } from "../../../../../helpers/dateHelpers";
import { TCreateEventArgs } from "../../../../../redux/services/events/eventsApi";
import { IEvent } from "../../../../../types/entities.types";
import WeekDayColumn from "./WeekDayColumn";
import st from "./WeekDaysColumns.module.scss";

interface IProps {
  currentWeekDays: Dayjs[];
  hoursArr: string[];
  hoursNow: string;
  events: IEvent[];
  onDeleteEvent: (id: string) => void;
  onCreateEvent: (ev: TCreateEventArgs) => void;
}

const secsInDay = 86400;

const WeekDaysColumns: FC<IProps> = ({
  currentWeekDays,
  hoursArr,
  hoursNow,
  events,
  onCreateEvent,
  onDeleteEvent,
}) => {
  const linePos = (DateHelpers.hoursToSeconds(hoursNow) / secsInDay) * 100;

  return (
    <div className={st.weekDaysColumns}>
      <div className={st.redline} style={{ top: `${linePos || 0}%` }} />
      <span className={st.timeNow} style={{ top: `${linePos || 0}%` }}>
        {hoursNow}
      </span>
      {currentWeekDays.map((wd, idx) => {
        const dayEvents = events.filter((e) => e.date === wd.format("MM DD YY"));
        return (
          <WeekDayColumn
            hoursArr={hoursArr}
            key={idx}
            day={wd}
            events={dayEvents}
            onCreateEvent={onCreateEvent}
            onDeleteEvent={onDeleteEvent}
          />
        );
      })}
    </div>
  );
};

export default WeekDaysColumns;
