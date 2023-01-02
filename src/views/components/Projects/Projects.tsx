import React, { FC, useEffect } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { PlusIcon } from "../../../assets/icons";
import { useModal } from "../../../hooks/useModal";
import { translate } from "../../../locales/translate";
import { useLazyGetMyProjectsQuery } from "../../../redux/services/projects/projectsApi";
import CreateProjectForm from "../forms/CreateProjectForm/CreateProjectForm";
import Button from "../UI/Button/Button";
import Loader from "../UI/Loader/Loader";
import Modal from "../UI/Modal/Modal";
import ProjectItem from "./ProjectItem/ProjectItem";
import st from "./Projects.module.scss";

interface IProps extends WrappedComponentProps {}

const Projects: FC<IProps> = ({ intl }) => {
  const { isOpen, onClose, onOpen } = useModal();
  const [fetchProjects, { data, isLoading }] = useLazyGetMyProjectsQuery();

  const handleFetchProjects = async () => {
    await fetchProjects();
  };

  useEffect(() => {
    handleFetchProjects();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className={st.wrapper}>
        <div className={st.add}>
          <Button onClick={onOpen}>
            {translate({ id: "projects.create" })}
            <PlusIcon size={16} />
          </Button>
        </div>
        {data ? data.map((pr) => <ProjectItem project={pr} key={pr._id} />) : null}
      </div>
      <Modal isOpen={isOpen} onClose={onClose} title={intl.formatMessage({ id: "createProject.title" })}>
        <CreateProjectForm onClose={onClose} />
      </Modal>
    </>
  );
};

export default injectIntl(Projects);
