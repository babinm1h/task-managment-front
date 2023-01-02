import { Placement } from "@popperjs/core";
import cn from "classnames";
import React, { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import st from "./PopMenu.module.scss";

interface IProps {
  placement: Placement;
  triggerElem: React.ReactNode;
  onClick?: () => void;
  isOpen: boolean;
  offset?: [number, number];
}

const PopMenu: FC<PropsWithChildren<IProps>> = ({
  children,
  placement,
  triggerElem,
  onClick,
  isOpen,
  offset = [0, 5],
}) => {
  const [triggereEl, setTriggerEl] = useState<HTMLDivElement | null>(null);
  const [tooltipEl, setTooltipEl] = useState<HTMLDivElement | null>(null);

  const triggerRef = useRef<any>(null);
  const tooltipRef = useRef<any>(null);

  const { styles, attributes } = usePopper(triggereEl, tooltipEl, {
    placement: placement,
    modifiers: [
      {
        name: "offset",
        options: { offset: offset },
      },
    ],
  });

  useEffect(() => {
    if (triggerRef.current) setTriggerEl(triggerRef.current);
    if (tooltipRef.current) setTooltipEl(tooltipRef.current);
  }, [triggerRef.current, tooltipRef.current]);

  return (
    <>
      <div role={"button"} ref={triggerRef} onClick={onClick} className={st.trigger}>
        {triggerElem}
      </div>
      <div
        ref={tooltipRef}
        className={cn(st.tooltip, { [st.tooltip_opened]: isOpen })}
        style={{ ...styles.popper }}
        {...attributes.popper}
      >
        {children}
      </div>
    </>
  );
};

export default PopMenu;
