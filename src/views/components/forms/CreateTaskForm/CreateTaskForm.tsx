import { useFormik } from "formik";
import React, { FC } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import * as Yup from "yup";
import { VALIDATE_MESSAGES } from "../../../../helpers/validateHelpers";
import { translate } from "../../../../locales/translate";
import Button from "../../UI/Button/Button";
import Datepicker from "../../UI/Datepicker/Datepicker";
import Input from "../../UI/Input/Input";
import st from "./CreateTaskForm.module.scss";

interface IForm {
  text: string;
  deadline: Date;
}

interface IProps extends WrappedComponentProps {
  onSubmit: (values: { text: string; deadline: Date }) => void;
}

const CreateTaskForm: FC<IProps> = ({ onSubmit, intl }) => {
  const validationSchema = Yup.object().shape({
    text: Yup.string().required(VALIDATE_MESSAGES.REQUIRED).min(1, "Minimal length is 1 symbol").max(500),
    deadline: Yup.date(),
  });

  const initialValues = {
    text: "",
    deadline: new Date(),
  };

  const formik = useFormik<IForm>({
    initialValues,
    validateOnChange: false,
    validationSchema,
    onSubmit(values, { setSubmitting }) {
      setSubmitting(true);
      onSubmit(values);
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={st.form}>
      <div className={st.content}>
        <div className={st.field}>
          <Input
            type="text"
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            placeholder={intl.formatMessage({ id: "createTask.description" })}
            errorMsg={formik.errors.text}
            label={intl.formatMessage({ id: "createTask.description" })}
          />
        </div>
        <div className={st.field}>
          <Datepicker
            minDate={new Date()}
            label={intl.formatMessage({ id: "createTask.until" })}
            startDate={formik.values.deadline}
            onChange={(date) => {
              formik.setFieldValue("deadline", date);
            }}
          />
        </div>
      </div>
      <Button type="submit" disabled={formik.isSubmitting}>
        {translate({ id: "common.create" })}
      </Button>
    </form>
  );
};

export default injectIntl(CreateTaskForm);
