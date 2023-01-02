import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { APP_ROUTES } from "../../components/AppRoutes/AppRoutes";
import LoginForm from "../../components/forms/LoginForm/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate(APP_ROUTES.main);
    }
  }, [user]);

  return <LoginForm />;
};

export default LoginPage;
