import { useFormik } from "formik";
import React, { FC } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import st from "./UpdateColumnForm.module.scss";
import * as Yup from "yup";
import { useUpdateColumnMutation } from "../../../../redux/services/columns/columnsApi";
import { VALIDATE_MESSAGES } from "../../../../helpers/validateHelpers";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { translate } from "../../../../locales/translate";
import { notifyError, notifySuccess } from "../../../../helpers/toastHelpers";

interface IProps extends WrappedComponentProps {
  onSubmit: (name: string) => void;
  columnId: string;
}

const UpdateColumnForm: FC<IProps> = ({ onSubmit, columnId, intl }) => {
  const [updateCol, { isLoading }] = useUpdateColumnMutation();

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, intl.formatMessage({ id: "errors.min.length" }, { num: 1 }))
      .max(100, intl.formatMessage({ id: "errors.max.length" }, { num: 100 }))
      .required(VALIDATE_MESSAGES.REQUIRED),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await updateCol({ name: values.name, id: columnId });
        onSubmit(values.name);
        notifySuccess("");
      } catch (err: any) {
        notifyError(err.data?.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form className={st.form} onSubmit={formik.handleSubmit}>
      <div className={st.fields}>
        <Input
          placeholder={intl.formatMessage({ id: "editColumn.label.name" })}
          label={intl.formatMessage({ id: "editColumn.label.name" })}
          onChange={formik.handleChange}
          name="name"
          errorMsg={formik.errors.name}
        />
      </div>
      <Button type="submit" disabled={isLoading || formik.isSubmitting}>
        {translate({ id: "common.update" })}
      </Button>
    </form>
  );
};

export default injectIntl(UpdateColumnForm);
