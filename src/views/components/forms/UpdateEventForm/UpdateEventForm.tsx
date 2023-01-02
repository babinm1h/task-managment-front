import React, { FC } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { translate } from "../../../../locales/translate";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import * as Yup from "yup";
import st from "./UpdateEventForm.module.scss";
import { VALIDATE_MESSAGES } from "../../../../helpers/validateHelpers";
import { useFormik } from "formik";
import Datepicker from "../../UI/Datepicker/Datepicker";
import { DateHelpers } from "../../../../helpers/dateHelpers";
import { TUpdateEventArgs } from "../../../../redux/services/events/eventsApi";

interface IProps extends WrappedComponentProps {
  onSubmit: (args: Omit<TUpdateEventArgs, "id">) => void;
  name: string;
  time: string;
  date: string;
}

const UpdateEventForm: FC<IProps> = ({ intl, onSubmit, date, name, time }) => {
  const initialValues = { name, time, date };

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
    onSubmit: (values, formikHelpers) => {
      onSubmit(values);
      formikHelpers.setSubmitting(false);
    },
  });

  const handleTimeChange = (date: Date | null) => {
    if (!date) return;
    formik.setFieldValue("time", DateHelpers.format("HH:mm", date));
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    formik.setFieldValue("date", DateHelpers.getDateObj(date).format("MM DD YY"));
  };

  return (
    <form className={st.form} onSubmit={formik.handleSubmit}>
      <Input
        label={intl.formatMessage({ id: "calendar.label.name" })}
        name="name"
        value={formik.values.name}
        errorMsg={formik.errors.name}
        onChange={formik.handleChange}
        autoComplete={"off"}
      />
      <Datepicker
        label={intl.formatMessage({ id: "calendar.label.time" })}
        name="time"
        value={formik.values.time}
        onChange={handleTimeChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        startDate={new Date()}
        showTimeSelectOnly
        errorMsg={formik.errors.time}
        autoComplete={"off"}
      />
      <Datepicker
        label={intl.formatMessage({ id: "calendar.label.date" })}
        name="date"
        value={DateHelpers.getDateObj(formik.values.date).format("DD.MM.YYYY")}
        onChange={handleDateChange}
        startDate={new Date()}
        autoComplete={"off"}
        errorMsg={formik.errors.date}
      />
      <Button type="submit" disabled={formik.isSubmitting}>
        {translate({ id: "common.update" })}
      </Button>
    </form>
  );
};

export default injectIntl(UpdateEventForm);
