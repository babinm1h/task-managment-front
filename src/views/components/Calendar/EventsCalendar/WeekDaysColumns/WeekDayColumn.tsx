import { Dayjs } from "dayjs";
import { FC } from "react";
import { TCreateEventArgs } from "../../../../../redux/services/events/eventsApi";
import { IEvent } from "../../../../../types/entities.types";
import ColumnHourCell from "./ColumnHourCell";
import st from "./WeekDaysColumns.module.scss";

interface IProps {
  hoursArr: string[];
  day: Dayjs;
  events: IEvent[];
  onCreateEvent: (ev: TCreateEventArgs) => void;
  onDeleteEvent: (id: string) => void;
}

const WeekDayColumn: FC<IProps> = ({ hoursArr, day, events = [], onCreateEvent, onDeleteEvent }) => {
  const getHourEvents = (hour: string) => {
    return events.filter((ev) => ev.time.split(":")[0] === hour.split(":")[0]);
  };

  return (
    <div className={st.dayCol}>
      {hoursArr.map((h) => (
        <ColumnHourCell
          cellHour={h}
          key={h}
          events={getHourEvents(h)}
          onCreateEvent={onCreateEvent}
          belongsToDay={day}
          onDeleteEvent={onDeleteEvent}
        />
      ))}
    </div>
  );
};

export default WeekDayColumn;
