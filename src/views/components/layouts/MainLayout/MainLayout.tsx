import React, { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import st from "./MainLayout.module.scss";

const MainLayout: FC<PropsWithChildren> = () => {
  return (
    <div className={st.wrapper}>
      <Header />
      <main className={st.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
