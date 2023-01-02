import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../../../../../types/entities.types";
import cn from "classnames";
import st from "./Task.module.scss";
import { CheckedIcon, FireIcon, TrashIcon } from "../../../../../assets/icons";
import { useModal } from "../../../../../hooks/useModal";
import Modal from "../../../UI/Modal/Modal";
import { DateHelpers } from "../../../../../helpers/dateHelpers";
import { translate } from "../../../../../locales/translate";

interface IProps {
  task: ITask;
  index: number;
  onDelete: (id: string) => void;
  toggleCompleteTask: (id: string, colId: string, completed: boolean) => void;
}

const Task: FC<IProps> = ({ task, index, onDelete, toggleCompleteTask }) => {
  const { isOpen, onClose, onOpen } = useModal();

  const deadline = DateHelpers.formatDate(task.deadline, "DD.MM.YYYY");
  const isExpired = DateHelpers.checkIsAfter(task.deadline);

  const onToggleCompleteTask = () => {
    toggleCompleteTask(task._id, task.column, task.completed);
  };

  return (
    <>
      <Draggable draggableId={`${task._id}`} index={index}>
        {(provided, snap) => (
          <li
            className={cn(st.task, { [st.dragging]: snap.isDragging })}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className={cn(st.taskInner, { [st.completed]: task.completed })}>
              <p className={st.text}>{task.text}</p>
              <div className={st.actions}>
                <button className={st.actionBtn} onClick={onOpen}>
                  <TrashIcon />
                </button>
                <div className={cn(st.date, { [st.expired]: isExpired })}>
                  {translate({ id: "common.until" })} {deadline}
                </div>
                {isExpired && <FireIcon color="#ff7f23" size={18} />}
              </div>
            </div>
            <button
              className={cn(st.completeBtn, { [st.completed]: task.completed })}
              onClick={onToggleCompleteTask}
            >
              <CheckedIcon size={20} />
            </button>
          </li>
        )}
      </Draggable>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Delete task?"
        withConfirm
        onConfirm={() => onDelete(task._id)}
      />
    </>
  );
};

export default Task;
