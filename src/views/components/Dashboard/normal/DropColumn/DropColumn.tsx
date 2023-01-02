// @ts-nocheck
import React, { FC } from "react";
import { useDrop } from "react-dnd";
import { DragTypes } from "../../../../../types/constants/dragTypes";
import { ItemStatus, IItem } from "../../../../../types/entities.types";
import cn from "classnames";

import st from "./DropColumn.module.scss";
import { useModal } from "../../../../../hooks/useModal";
import Modal from "../../../UI/Modal/Modal";
import Task from "../Task/Task";
import CreateTaskForm from "../../../forms/CreateTaskForm/CreateTaskForm";

interface IProps {
  title: string;
  status: ItemStatus;
  items: IItem[];
  onDrop: (id: number, status: ItemStatus) => void;
  moveCard: (draggedId: number, hoverIndex: number) => void;
  findItem: (id: number) => IItem & { index: number };
  setIsOverColumn: (status: ItemStatus) => void;
  handleAddItem: (text: string, status: ItemStatus) => void;
}

const DropColumn: FC<IProps> = ({
  title,
  status,
  items,
  moveCard,
  onDrop,
  findItem,
  setIsOverColumn,
  handleAddItem,
}) => {
  // const { isOpen, onClose, onOpen } = useModal();

  // const [{ isOver }, drop] = useDrop<IItem, any, any>({
  //   accept: DragTypes.task,
  //   collect: (monitor) => ({ isOver: !!monitor.isOver() }),

  //   drop: (item) => {
  //     onDrop(item.id, status);
  //   },
  //   hover: () => {
  //     setIsOverColumn(status);
  //   },
  // });

  // const onSubmit = (text: string) => {
  //   handleAddItem(text, status);
  //   onClose();
  // };

  return (
    <>
      {/* <div className={st.wrapper} ref={drop}>
        <h3>{title}</h3>
        <ul className={cn(st.list, { [st.isOver]: isOver })}>
          {items
            .filter((it) => it.status === status)
            .map((item) => (
              <Task item={item} key={item.id} moveCard={moveCard} findItem={findItem} />
            ))}
        </ul>
        <div className={st.footer}>
          <button onClick={onOpen}>Add task</button>
        </div>
      </div>

      <Modal title="Add task" isOpen={isOpen} onClose={onClose}>
        <CreateTaskForm onSubmit={onSubmit} />
      </Modal> */}
    </>
  );
};

export default DropColumn;
