import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import ProjectsPage from "../../pages/ProjectsPage/ProjectsPage";
import RegisrationPage from "../../pages/RegisrationPage/RegisrationPage";
import Calendar from "../Calendar/Calendar";
import MainLayout from "../layouts/MainLayout/MainLayout";
import RequireAuth from "../RequireAuth/RequireAuth";

export enum APP_ROUTES {
  login = "/login",
  signup = "/signup",
  main = "/",
  project = "/project",
  calendar = "/calendar",
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path={APP_ROUTES.main} element={<MainLayout />}>
          <Route index element={<ProjectsPage />} />
          <Route element={<Calendar />} path={APP_ROUTES.calendar} />
          <Route path={APP_ROUTES.project + "/:id"} element={<DashboardPage />} />
        </Route>
      </Route>
      <Route path={APP_ROUTES.login} element={<LoginPage />} />
      <Route path={APP_ROUTES.signup} element={<RegisrationPage />} />
      <Route path={"/*"} element={<Navigate to={APP_ROUTES.main} />} />
    </Routes>
  );
};

export default AppRoutes;
