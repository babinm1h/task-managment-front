import React, { FC } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { translate } from "../../../../locales/translate";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import * as Yup from "yup";
import st from "./CreateEventForm.module.scss";
import { VALIDATE_MESSAGES } from "../../../../helpers/validateHelpers";
import { useFormik } from "formik";
import Datepicker from "../../UI/Datepicker/Datepicker";
import { DateHelpers } from "../../../../helpers/dateHelpers";

interface IProps extends WrappedComponentProps {
  onSubmit: (name: string, time: string) => void;
}

const CreateEventForm: FC<IProps> = ({ intl, onSubmit }) => {
  const initialValues = { name: "", time: "" };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, intl.formatMessage({ id: "errors.min.length" }, { num: 1 }))
      .max(100, intl.formatMessage({ id: "errors.max.length" }, { num: 100 }))
      .required(VALIDATE_MESSAGES.REQUIRED),
    time: Yup.string().required(VALIDATE_MESSAGES.REQUIRED),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: ({ name, time }, formikHelpers) => {
      onSubmit(name, time);
      formikHelpers.setSubmitting(false);
    },
  });

  const handleTimeChange = (date: Date | null) => {
    if (!date) return;
    formik.setFieldValue("time", DateHelpers.format("HH:mm", date));
  };

  return (
    <form className={st.form} onSubmit={formik.handleSubmit}>
      <Input
        label={intl.formatMessage({ id: "calendar.createEvent.label.name" })}
        name="name"
        value={formik.values.name}
        errorMsg={formik.errors.name}
        onChange={formik.handleChange}
      />
      <Datepicker
        label={intl.formatMessage({ id: "calendar.createEvent.label.time" })}
        name="time"
        value={formik.values.time}
        onChange={handleTimeChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        startDate={new Date()}
        showTimeSelectOnly
        errorMsg={formik.errors.time}
      />
      <Button type="submit" disabled={formik.isSubmitting}>
        {translate({ id: "common.create" })}
      </Button>
    </form>
  );
};

export default injectIntl(CreateEventForm);
