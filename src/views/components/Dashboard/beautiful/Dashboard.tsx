import { FC } from "react";
import st from "./Dashboard.module.scss";
import { DragDropContext } from "react-beautiful-dnd";
import DropColumn from "./DropColumn/DropColumn";
import Loader from "../../UI/Loader/Loader";
import Modal from "../../UI/Modal/Modal";
import CreateColumnForm from "../../forms/CreateColumnForm/CreateColumnForm";
import Button from "../../UI/Button/Button";
import { PlusIcon } from "../../../../assets/icons";
import { translate } from "../../../../locales/translate";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { getPercent } from "../../../../helpers/getPercent";
import Charts from "./Charts/Charts";
import { useDashboard } from "../../../../hooks/components/useDashboard";

interface IProps extends WrappedComponentProps {}

const Dashboard: FC<IProps> = ({ intl }) => {
  const {
    genCompleted,
    genExpiredData,
    genInProgress,
    handleAddCol,
    handleAddTask,
    handleDeleteCol,
    handleDeleteTask,
    handleUpdateCol,
    isLoading,
    isOpen,
    onClose,
    onDragEnd,
    onOpen,
    toggleCompleteTask,
    allTasks,
    columns,
    completed,
    expired,
    inProgress,
    id,
  } = useDashboard();

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
