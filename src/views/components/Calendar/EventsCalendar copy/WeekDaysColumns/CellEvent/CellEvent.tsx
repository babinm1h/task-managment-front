import classNames from "classnames";
import React, { FC } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { EditIcon, TrashIcon } from "../../../../../../assets/icons";
import { DateHelpers } from "../../../../../../helpers/dateHelpers";
import { useModal } from "../../../../../../hooks/useModal";
import { useOutsideClick } from "../../../../../../hooks/useOutsideClick";
import { TUpdateEventArgs } from "../../../../../../redux/services/events/eventsApi";
import { IEvent } from "../../../../../../types/entities.types";
import UpdateEventForm from "../../../../forms/UpdateEventForm/UpdateEventForm";
import Modal from "../../../../UI/Modal/Modal";
import PopMenu from "../../../../UI/PopMenu/PopMenu";
import st from "./CellEvent.module.scss";

interface IProps extends WrappedComponentProps {
  event: IEvent;
  onDeleteEvent: (id: string) => void;
  onUpdateEvent: (dto: TUpdateEventArgs) => void;
}

const CellEvent: FC<IProps> = ({ event, intl, onDeleteEvent, onUpdateEvent }) => {
  const { isVisible, onToggleVisible, ref } = useOutsideClick(false);
  const { isOpen, onClose, onOpen } = useModal();

  const eventDate = DateHelpers.getDateObj(event.date).format("DD.MM.YYYY");

  const handleDelete = () => {
    onDeleteEvent(event._id);
  };

  const handleUpdate = (args: Omit<TUpdateEventArgs, "id">) => {
    onUpdateEvent({ id: event._id, ...args });
  };

  const onEventClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleVisible();
  };

  return (
    <>
      <div className={st.event} ref={ref} onClick={onEventClick}>
        <PopMenu
          isOpen={isVisible}
          placement={`right`}
          triggerElem={<div className={st.inner}>{event.name}</div>}
          offset={[0, 10]}
        >
          <div className={st.menuInner}>
            <div className={st.menuItems}>
              <div className={classNames(st.menuItem, st.eventName)}>{event.name}</div>
              <div className={st.menuItem}>
                {intl.formatMessage({ id: "calendar.event.label.date" })}: {eventDate}
              </div>
              <div className={st.menuItem}>
                {intl.formatMessage({ id: "calendar.label.time" })}: {event.time}
              </div>
            </div>
            <div className={st.menuActs}>
              <button onClick={handleDelete}>
                <TrashIcon size={18} />
              </button>
              <button onClick={onOpen}>
                <EditIcon size={20} />
              </button>
            </div>
          </div>
        </PopMenu>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={intl.formatMessage({ id: "calendar.update.modal.title" })}
      >
        <UpdateEventForm onSubmit={handleUpdate} name={event.name} date={event.date} time={event.time} />
      </Modal>
    </>
  );
};

export default injectIntl(CellEvent);
