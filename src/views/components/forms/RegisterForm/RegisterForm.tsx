import React, { useState, FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../AppRoutes/AppRoutes";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import st from "./RegisterForm.module.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRegistrateMutation } from "../../../../redux/services/auth/authApi";
import { useAppDispatch } from "../../../../hooks/redux";
import { setAuthData } from "../../../../redux/slices/authSlice";
import { setTokenCookie } from "../../../../helpers/cookieHelpers";
import { translate } from "../../../../locales/translate";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { VALIDATE_MESSAGES } from "../../../../helpers/validateHelpers";

interface IForm {
  email: string;
  password: string;
}

interface IProps extends WrappedComponentProps {}

const RegisterForm: FC<IProps> = ({ intl }) => {
  const [registrate, { isLoading }] = useRegistrateMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const passwordPlaceholder = intl.formatMessage({ id: "auth.password" });

  const initialValues: IForm = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage({ id: "errors.email" }))
      .required(VALIDATE_MESSAGES.REQUIRED)
      .min(4, intl.formatMessage({ id: "errors.min.length" }, { num: 4 }))
      .max(40, intl.formatMessage({ id: "errors.max.length" }, { num: 40 })),
    password: Yup.string()
      .required(VALIDATE_MESSAGES.REQUIRED)
      .min(4, intl.formatMessage({ id: "errors.min.length" }, { num: 4 }))
      .max(32, intl.formatMessage({ id: "errors.max.length" }, { num: 32 })),
  });

  const formik = useFormik<IForm>({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      registrate(values)
        .unwrap()
        .then((data) => {
          dispatch(setAuthData(data.user));
          setTokenCookie(data.token);
          navigate(APP_ROUTES.main);
        })
        .catch((e) => {
          setErrMsg(e.data.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });
  return (
    <div className={st.wrapper}>
      <div className={st.block}>
        <h2>{translate({ id: "auth.signUp" })}</h2>
        <form action="/" className={st.form} onSubmit={formik.handleSubmit}>
          <div className={st.body}>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              errorMsg={formik.errors.email}
            />
            <Input
              placeholder={passwordPlaceholder}
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              errorMsg={formik.errors.password}
            />
          </div>
          <div className={st.footer}>
            {errMsg ? <div className="error">{errMsg}</div> : null}
            <Button type="submit" disabled={formik.isSubmitting || isLoading}>
              {translate({ id: "auth.signUp" })}
            </Button>
            <p>
              {translate({ id: "auth.login.hint" })}
              <NavLink to={APP_ROUTES.login}>{translate({ id: "auth.login" })}</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default injectIntl(RegisterForm);
