import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { APP_ROUTES } from "../AppRoutes/AppRoutes";

const RequireAuth = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to={APP_ROUTES.login} state={{ from: `` }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
