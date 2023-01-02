// @ts-nocheck
import React, { FC, useState } from "react";
import st from "./Dashboard.module.scss";
import { ItemStatus, IItem } from "../../../../types/entities.types";
import { DragDropContext, Droppable, OnDragEndResponder, Draggable } from "react-beautiful-dnd";
import DropColumn from "./DropColumn/DropColumn";

export const boardItems: IItem[] = [
  { id: 1, status: ItemStatus.open, text: "First item" },
  { id: 2, status: ItemStatus.open, text: "Second item" },
  { id: 3, status: ItemStatus.completed, text: "Third item" },
  { id: 4, status: ItemStatus.review, text: "Fourth item" },
  { id: 5, status: ItemStatus.open, text: "Fifth item" },
  { id: 6, status: ItemStatus.inProgress, text: "Sixth item" },
  { id: 7, status: ItemStatus.inProgress, text: "Seventh item" },
  { id: 8, status: ItemStatus.open, text: "Eighth item" },
];

interface IProps {}

const Dashboard: FC<IProps> = () => {
  const [items, setItems] = useState<IItem[]>(boardItems);
  const [isOverColumn, setIsOverColumn] = useState<ItemStatus | null>(null);

  const onDrop = (id: number, status: ItemStatus) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          return { ...i, status: status };
        }
        return i;
      })
    );
  };

  const moveCard = (draggedId: number, hoverIndex: number) => {
    const item = items.find((i) => i.id === draggedId);
    if (item?.status !== isOverColumn) return;

    if (item) {
      const dragIndex = items.indexOf(item);
      setItems((prevState) => {
        const newItems = prevState.filter((i, idx) => idx !== dragIndex);
        newItems.splice(hoverIndex, 0, item);
        return [...newItems];
      });
    }
  };

  const findItem = (id: number) => {
    const card = items.filter((c) => c.id === id)[0];
    return {
      ...card,
      index: items.indexOf(card),
    };
  };

  const onSetIsOverCol = (status: ItemStatus) => {
    if (isOverColumn === status) return;
    setIsOverColumn(status);
  };

  const handleAddItem = (text: string, status: ItemStatus) => {
    setItems([...items, { text, status, id: items.length + 1 }]);
  };

  return (
    <div className={st.wrapper}>
      {Object.values(ItemStatus).map((status) => (
        <DropColumn
          title={status}
          status={status}
          items={items}
          key={status}
          onDrop={onDrop}
          findItem={findItem}
          moveCard={moveCard}
          setIsOverColumn={onSetIsOverCol}
          handleAddItem={handleAddItem}
        />
      ))}
      <Testik />
    </div>
  );
};

export default Dashboard;

const Testik = () => {
  const [items, setItems] = useState<IItem[]>(boardItems);

  const onDragEnd: OnDragEndResponder = (result, prov) => {
    console.log(prov);
    if (!result.destination) return;
    const updItems = Array.from(items);
    const [reordered] = updItems.splice(result.source.index, 1);
    updItems.splice(result.destination.index, 0, reordered);
    setItems(updItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provider, snap) => (
          <div {...provider.droppableProps} ref={provider.innerRef}>
            {items.map((it, idx) => (
              <Draggable key={it.id} draggableId={`${it.id}`} index={idx}>
                {(dragProvider, dragSnap) => (
                  <div
                    ref={dragProvider.innerRef}
                    {...dragProvider.draggableProps}
                    {...dragProvider.dragHandleProps}
                    className={st.item}
                  >
                    {it.text}
                  </div>
                )}
              </Draggable>
            ))}
            {provider.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
