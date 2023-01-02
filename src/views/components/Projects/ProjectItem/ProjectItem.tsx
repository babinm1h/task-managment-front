import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { TrashIcon } from "../../../../assets/icons";
import { notifyError } from "../../../../helpers/toastHelpers";
import { translate } from "../../../../locales/translate";
import { useDeleteProjectMutation } from "../../../../redux/services/projects/projectsApi";
import { IProject } from "../../../../types/entities.types";
import { APP_ROUTES } from "../../AppRoutes/AppRoutes";
import st from "./ProjectItem.module.scss";

interface IProps {
  project: IProject;
}

const ProjectItem: FC<IProps> = ({ project }) => {
  const [deleteProj, { isLoading }] = useDeleteProjectMutation();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await deleteProj({ id: project._id });
    } catch (err: any) {
      notifyError(err.data?.message);
    }
  };

  return (
    <NavLink to={APP_ROUTES.project + `/${project._id}`} key={project._id} className={st.project}>
      <div className={st.body}>
        <div className={st.name}>{project.name}</div>
        <div className={st.taskStat}>
          <span className={st.taskCount}>{project.tasksCount}</span>
          <span>{translate({ id: "projects.tasks" })}</span>
        </div>
      </div>
      <div className={st.actions}>
        <button disabled={isLoading} onClick={handleDelete}>
          <TrashIcon size={18} />
        </button>
      </div>
    </NavLink>
  );
};

export default ProjectItem;
