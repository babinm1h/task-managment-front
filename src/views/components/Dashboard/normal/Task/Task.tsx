// @ts-nocheck
import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragTypes } from "../../../../../types/constants/dragTypes";
import { ItemStatus, IItem } from "../../../../../types/entities.types";

import st from "./Task.module.scss";

interface IProps {
  item: IItem;
  moveCard: (draggedId: number, to: number) => void;
  findItem: (id: number) => IItem & { index: number };
}

const Task: FC<IProps> = ({ item, moveCard, findItem }) => {
  const originalIndex = findItem(item.id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { id: item.id },
    type: DragTypes.task,

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),

    end: (item, monitor) => {
      const { id } = item;
      const didDrop = !!monitor.didDrop();
      if (!didDrop) {
        moveCard(id, originalIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: DragTypes.task,
    hover: ({ id }: { id: number }, monitor) => {
      if (id !== item.id) {
        const { index } = findItem(item.id);
        moveCard(id, index);
      }
    },
  });

  return (
    <li className={st.item} style={{ opacity: isDragging ? 0 : 1 }} ref={(node) => drag(drop(node))}>
      <p className={st.text}>{item.text}</p>
    </li>
  );
};

export default Task;
