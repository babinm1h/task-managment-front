import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { APP_ROUTES } from "../../components/AppRoutes/AppRoutes";
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";

const RegisrationPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate(APP_ROUTES.main);
    }
  }, [user]);

  return <RegisterForm />;
};

export default RegisrationPage;
