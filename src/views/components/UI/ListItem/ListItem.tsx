import cn from "classnames";
import React, { DetailedHTMLProps, LiHTMLAttributes, PropsWithChildren } from "react";
import st from "./ListItem.module.scss";

interface IProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  active?: boolean;
}

const ListItem = React.forwardRef<HTMLDivElement, PropsWithChildren<IProps>>(function (
  { children, active, className, ...props },
  ref
) {
  return (
    <div {...props} ref={ref} className={cn(st.listItem, className, { [st.active]: active })}>
      {children}
    </div>
  );
});

export default ListItem;
