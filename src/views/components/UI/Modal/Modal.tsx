import React, { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { translate } from "../../../../locales/translate";
import Button from "../Button/Button";

import st from "./Modal.module.scss";

interface IProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  withConfirm?: boolean;
}

const Modal: FC<PropsWithChildren<IProps>> = ({
  children,
  title,
  onClose,
  isOpen,
  onConfirm,
  withConfirm,
}) => {
  return createPortal(
    <CSSTransition timeout={80} in={isOpen} classNames={{ enterDone: st.entered }} mountOnEnter unmountOnExit>
      <div className={st.overlay} onClick={onClose}>
        <div className={st.modal} onClick={(e) => e.stopPropagation()}>
          <div className={st.header}>{title}</div>
          <div className={st.content}>{children}</div>
          {withConfirm && (
            <div className={st.footer}>
              <Button onClick={onConfirm}>{translate({ id: "common.confirm" })}</Button>
            </div>
          )}
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default Modal;
