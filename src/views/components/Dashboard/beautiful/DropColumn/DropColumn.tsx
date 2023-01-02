import { FC } from "react";
import cn from "classnames";
import st from "./DropColumn.module.scss";
import { useModal } from "../../../../../hooks/useModal";
import Modal from "../../../UI/Modal/Modal";
import Task from "../Task/Task";
import { Droppable } from "react-beautiful-dnd";
import { IColumn, ITask } from "../../../../../types/entities.types";
import Button from "../../../UI/Button/Button";
import CreateTaskForm from "../../../forms/CreateTaskForm/CreateTaskForm";
import { useCreateTaskMutation, useDeleteTaskMutation } from "../../../../../redux/services/tasks/tasksApi";
import { useDeleteColumnMutation } from "../../../../../redux/services/columns/columnsApi";
import DropColumnHeader from "./DropColumnHeader/DropColumnHeader";
import { translate } from "../../../../../locales/translate";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { notifyError } from "../../../../../helpers/toastHelpers";

interface IProps extends WrappedComponentProps {
  title: string;
  column: IColumn;
  handleAddTask: (task: ITask) => void;
  handleDeleteTask: (id: string, colId: string) => void;
  handleDeleteCol: (id: string) => void;
  handleUpdateCol: (id: string, name: string) => void;
  toggleCompleteTask: (id: string, colId: string, completed: boolean) => void;
}

const DropColumn: FC<IProps> = ({
  intl,
  column,
  handleAddTask,
  handleDeleteTask,
  handleDeleteCol,
  handleUpdateCol,
  toggleCompleteTask,
}) => {
  const { isOpen, onClose, onOpen } = useModal();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [deleteCol] = useDeleteColumnMutation();

  const onDeleteCol = async () => {
    try {
      handleDeleteCol(column._id);
      await deleteCol(column._id).unwrap();
    } catch (err: any) {
      notifyError(err.data?.message);
    }
  };

  const onSubmitCreateTask = async (values: { text: string; deadline: Date }) => {
    try {
      const newTask = await createTask({ ...values, columnId: column._id }).unwrap();
      if (newTask) handleAddTask(newTask);
      onClose();
    } catch (err: any) {
      notifyError(err.data?.message);
    }
  };

  const onSubmitUpdateCol = async (name: string) => {
    try {
      handleUpdateCol(column._id, name);
    } catch (err: any) {
      notifyError(err.data?.message);
    }
  };

  const onDelete = async (id: string) => {
    try {
      handleDeleteTask(id, column._id);
      await deleteTask(id);
    } catch (err: any) {
      notifyError(err.data?.message);
    }
  };

  return (
    <>
      <div className={st.wrapper}>
        <DropColumnHeader
          handleDeleteCol={onDeleteCol}
          id={column._id}
          handleUpdateCol={onSubmitUpdateCol}
          title={column.name}
        />
        <Droppable droppableId={`${column._id}`} key={column._id}>
          {(provided, snap) => (
            <ul
              className={cn(st.list, { [st.isOver]: snap.isDraggingOver })}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {column.tasks.length
                ? column.tasks.map((item, idx) => (
                    <Task
                      task={item}
                      index={idx}
                      key={item._id}
                      onDelete={onDelete}
                      toggleCompleteTask={toggleCompleteTask}
                    />
                  ))
                : translate({ id: "common.emptyList" })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <div className={st.footer}>
          <Button onClick={onOpen}>{translate({ id: "projects.create.task" })}</Button>
        </div>
      </div>
      <Modal title={intl.formatMessage({ id: "projects.create.task" })} isOpen={isOpen} onClose={onClose}>
        <CreateTaskForm onSubmit={onSubmitCreateTask} />
      </Modal>
    </>
  );
};

export default injectIntl(DropColumn);
