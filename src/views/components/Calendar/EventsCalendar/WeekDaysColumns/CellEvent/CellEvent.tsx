import classNames from "classnames";
import React, { FC } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { TrashIcon } from "../../../../../../assets/icons";
import { DateHelpers } from "../../../../../../helpers/dateHelpers";
import { useOutsideClick } from "../../../../../../hooks/useOutsideClick";
import { IEvent } from "../../../../../../types/entities.types";
import PopMenu from "../../../../UI/PopMenu/PopMenu";
import st from "./CellEvent.module.scss";

interface IProps extends WrappedComponentProps {
  event: IEvent;
  onDeleteEvent: (id: string) => void;
}

const CellEvent: FC<IProps> = ({ event, intl, onDeleteEvent }) => {
  const { isVisible, onToggleVisible, ref } = useOutsideClick(false);

  const eventDate = DateHelpers.getDateObj(event.date).format("DD.MM.YYYY");

  const handleDelete = () => {
    onDeleteEvent(event._id);
  };

  const onEventClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleVisible();
  };

  return (
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
              {intl.formatMessage({ id: "calendar.createEvent.label.time" })}: {event.time}
            </div>
          </div>
          <div className={st.menuActs}>
            <button onClick={handleDelete}>
              <TrashIcon size={18} />
            </button>
          </div>
        </div>
      </PopMenu>
    </div>
  );
};

export default injectIntl(CellEvent);
