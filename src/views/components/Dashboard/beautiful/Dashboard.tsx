import { FC, useEffect, useMemo, useState } from "react";
import st from "./Dashboard.module.scss";
import { IColumn, ITask } from "../../../../types/entities.types";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import DropColumn from "./DropColumn/DropColumn";
import { useLazyGetProjectByIdQuery } from "../../../../redux/services/projects/projectsApi";
import { useParams } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import { useModal } from "../../../../hooks/useModal";
import Modal from "../../UI/Modal/Modal";
import CreateColumnForm from "../../forms/CreateColumnForm/CreateColumnForm";
import Button from "../../UI/Button/Button";
import { PlusIcon } from "../../../../assets/icons";
import { useUpdateTaskMutation } from "../../../../redux/services/tasks/tasksApi";
import { translate } from "../../../../locales/translate";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { notifyError } from "../../../../helpers/toastHelpers";
import { DateHelpers } from "../../../../helpers/dateHelpers";
import { getPercent } from "../../../../helpers/getPercent";
import Charts from "./Charts/Charts";

interface IProps extends WrappedComponentProps {}

const Dashboard: FC<IProps> = ({ intl }) => {
  const { id } = useParams();
  const [fetchProject, { isLoading }] = useLazyGetProjectByIdQuery();
  const [updateTask] = useUpdateTaskMutation();

  const [columns, setColumns] = useState<IColumn[]>([]);
  const { isOpen, onClose, onOpen } = useModal();

  const handleFetchProj = async (id: string) => {
    const data = await fetchProject(id).unwrap();
    setColumns(data.columns.map((c) => ({ ...c })));
  };

  useEffect(() => {
    if (!id) return;
    try {
      handleFetchProj(id);
    } catch (err: any) {
      notifyError(err.data?.message);
    }
  }, [id]);

  const onDragEnd: OnDragEndResponder = async (result, prov) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = columns.findIndex((e) => e._id === source.droppableId);
      const destinationColIndex = columns.findIndex((e) => e._id === destination.droppableId);

      const sourceCol = columns[sourceColIndex];
      const destinationCol = columns[destinationColIndex];

      const sourceTasks = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      sourceCol.tasks = sourceTasks;
      columns[destinationColIndex].tasks = destinationTask;
      setColumns(columns);
      await updateTask({
        columnId: destination.droppableId,
        id: removed._id,
        toIndex: destination.index,
        fromIndex: source.index,
      });
    } else {
      const sourceColIndex = columns.findIndex((e) => e._id === source.droppableId);
      const sourceCol = columns[sourceColIndex];
      const sourceTasks = [...sourceCol.tasks];
      const [reordered] = sourceTasks.splice(source.index, 1);
      sourceTasks.splice(destination.index, 0, reordered);
      columns[sourceColIndex].tasks = sourceTasks;
      setColumns(columns);
      await updateTask({
        columnId: destination.droppableId,
        id: reordered._id,
        toIndex: destination.index,
        fromIndex: source.index,
      });
    }
  };

  const handleAddTask = (newTask: ITask) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col._id === newTask.column) {
          return { ...col, tasks: [...col.tasks, newTask] };
        }
        return col;
      })
    );
  };

  const handleDeleteTask = (id: string, colId: string) => {
    const col = columns.find((c) => c._id === colId);
    if (!col) return;
    const updatedTasks = col.tasks.filter((i) => i._id !== id);
    setColumns((prev) =>
      prev.map((col) => {
        if (col._id === colId) {
          return { ...col, tasks: updatedTasks };
        }
        return col;
      })
    );
  };

  const toggleCompleteTask = async (id: string, colId: string, completed: boolean) => {
    const col = columns.find((c) => c._id === colId);
    if (!col) return;
    const updatedTasks = col.tasks.map((t) => {
      if (t._id === id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });

    setColumns((prev) =>
      prev.map((col) => {
        if (col._id === colId) {
          return { ...col, tasks: updatedTasks };
        }
        return col;
      })
    );

    await updateTask({
      columnId: colId,
      id,
      completed: !completed,
    });
  };

  const handleAddCol = (col: IColumn) => {
    setColumns((prev) => [...prev, col]);
  };

  const handleDeleteCol = (id: string) => {
    setColumns((prev) => prev.filter((col) => col._id !== id));
  };

  const handleUpdateCol = (id: string, name: string) => {
    setColumns((prev) =>
      prev.map((c) => {
        if (c._id === id) {
          return { ...c, name };
        }
        return c;
      })
    );
  };

  const allTasks = useMemo(() => columns.map((c) => c.tasks).flat(1), [columns]);
  const expired = useMemo(() => allTasks.filter((t) => DateHelpers.checkIsAfter(t.deadline)), [allTasks]);
  const inProgress = useMemo(() => allTasks.filter((t) => !t.completed), [allTasks]);
  const completed = useMemo(() => allTasks.filter((t) => !!t.completed), [allTasks]);

  const genExpiredData = () => {
    return [
      { id: "exp", label: "Expired", value: expired.length },
      { id: "all", label: "All", value: allTasks.length },
    ];
  };

  const genInProgress = () => {
    return [
      { id: "inProg", label: "In Progress", value: inProgress.length },
      { id: "all", label: "All", value: allTasks.length },
    ];
  };

  const genCompleted = () => {
    return [
      { id: "compl", label: "Completed", value: completed.length },
      { id: "all", label: "All", value: inProgress.length },
    ];
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={st.wrapper}>
        <Button onClick={onOpen}>
          {translate({ id: "projects.create.column" })} <PlusIcon />
        </Button>

        <Charts
          completed={genCompleted()}
          completedPercent={getPercent(completed.length, allTasks.length)}
          expired={genExpiredData()}
          expiredPercent={getPercent(expired.length, allTasks.length)}
          inProgress={genInProgress()}
          inProgressPercent={getPercent(inProgress.length, allTasks.length)}
        />

        <div className={st.cols}>
          <DragDropContext onDragEnd={onDragEnd}>
            {columns.map((col) => (
              <DropColumn
                handleDeleteCol={handleDeleteCol}
                title={col.name}
                key={col._id}
                column={col}
                handleAddTask={handleAddTask}
                handleDeleteTask={handleDeleteTask}
                handleUpdateCol={handleUpdateCol}
                toggleCompleteTask={toggleCompleteTask}
              />
            ))}
          </DragDropContext>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} title={intl.formatMessage({ id: "projects.create.column" })}>
        <CreateColumnForm onClose={onClose} projectId={id || ""} onSubmit={handleAddCol} />
      </Modal>
    </>
  );
};

export default injectIntl(Dashboard);
