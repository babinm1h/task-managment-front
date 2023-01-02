import React, { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../AppRoutes/AppRoutes";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import st from "./LoginForm.module.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLoginMutation } from "../../../../redux/services/auth/authApi";
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

const LoginForm: FC<IProps> = ({ intl }) => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [errMsg, setErrMsg] = useState<string>("");

  const passwordPlaceHolder = intl.formatMessage({ id: "auth.password" });

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
      login(values)
        .unwrap()
        .then((data) => {
          dispatch(setAuthData(data.user));
          setTokenCookie(data.token);
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
        <h2>{translate({ id: "auth.login" })}</h2>
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
              placeholder={passwordPlaceHolder}
              type="password"
              name="password"
              value={formik.values.password}
              errorMsg={formik.errors.password}
              onChange={formik.handleChange}
            />
          </div>
          <div className={st.footer}>
            {errMsg ? <div className="error">{errMsg}</div> : null}
            <Button type="submit" disabled={formik.isSubmitting || isLoading}>
              {translate({ id: "auth.login" })}
            </Button>
            <p>
              {translate({ id: "auth.login.hint" })}
              <NavLink to={APP_ROUTES.signup}>{translate({ id: "auth.signUp" })}</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default injectIntl(LoginForm);
