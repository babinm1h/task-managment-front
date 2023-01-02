import { Dayjs } from "dayjs";
import { FC } from "react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { useModal } from "../../../../../hooks/useModal";
import { TCreateEventArgs, TUpdateEventArgs } from "../../../../../redux/services/events/eventsApi";
import { IEvent } from "../../../../../types/entities.types";
import CreateEventForm from "../../../forms/CreateEventForm/CreateEventForm";
import Modal from "../../../UI/Modal/Modal";
import CellEvent from "./CellEvent/CellEvent";
import st from "./DayEventsRows.module.scss";

interface IProps extends WrappedComponentProps {
  cellHour: string;
  events: IEvent[];
  onCreateEvent: (ev: TCreateEventArgs) => void;
  belongsToDay: Dayjs;
  onDeleteEvent: (id: string) => void;
  onUpdateEvent: (dto: TUpdateEventArgs) => void;
}

const ColumnHourCell: FC<IProps> = ({
  cellHour,
  events,
  intl,
  onCreateEvent,
  belongsToDay,
  onDeleteEvent,
  onUpdateEvent,
}) => {
  const { isOpen, onClose, onOpen } = useModal();

  const handleCreateEvent = (name: string, time: string) => {
    onCreateEvent({ date: belongsToDay.format("MM DD YY"), name, time });
    onClose();
  };

  return (
    <>
      <div className={st.hourCell} onClick={onOpen}>
        {events.map((e, idx) => {
          return (
            <CellEvent event={e} key={idx} onDeleteEvent={onDeleteEvent} onUpdateEvent={onUpdateEvent} />
          );
        })}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={intl.formatMessage({ id: "calendar.createEvent.modal.title" })}
      >
        <CreateEventForm onSubmit={handleCreateEvent} time={cellHour} />
      </Modal>
    </>
  );
};

export default injectIntl(ColumnHourCell);
