import React, { FC } from "react";
import { DotsIcon } from "../../../../../../assets/icons";
import { useModal } from "../../../../../../hooks/useModal";
import { useOutsideClick } from "../../../../../../hooks/useOutsideClick";
import { translate } from "../../../../../../locales/translate";
import UpdateColumnForm from "../../../../forms/UpdateColumnForm/UpdateColumnForm";
import Modal from "../../../../UI/Modal/Modal";
import PopMenu from "../../../../UI/PopMenu/PopMenu";
import st from "./DropColumnHeader.module.scss";
import { injectIntl, WrappedComponentProps } from "react-intl";

interface IProps extends WrappedComponentProps {
  handleDeleteCol(): void;
  id: string;
  handleUpdateCol: (name: string) => void;
  title: string;
}

const DropColumnHeader: FC<IProps> = ({ handleDeleteCol, handleUpdateCol, id, title, intl }) => {
  const editModal = useModal();
  const deleteModal = useModal();
  const { isVisible, onToggleVisible, ref } = useOutsideClick(false);

  return (
    <>
      <div className={st.header}>
        <h3>{title}</h3>
        <div className={st.menuWrap} ref={ref}>
          <PopMenu
            triggerElem={<DotsIcon size={20} />}
            isOpen={isVisible}
            onClick={onToggleVisible}
            placement="bottom-start"
          >
            <ul>
              <li onClick={deleteModal.onOpen}>{translate({ id: "common.delete" })}</li>
              <li onClick={editModal.onOpen}>{translate({ id: "common.edit" })}</li>
            </ul>
          </PopMenu>
        </div>
      </div>
      <Modal
        title={intl.formatMessage({ id: "projects.edit.column" })}
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
      >
        <UpdateColumnForm onSubmit={handleUpdateCol} columnId={id} />
      </Modal>
      <Modal
        title={intl.formatMessage({ id: "projects.delete.column" })}
        onClose={deleteModal.onClose}
        isOpen={deleteModal.isOpen}
        withConfirm
        onConfirm={handleDeleteCol}
      />
    </>
  );
};

export default injectIntl(DropColumnHeader);
