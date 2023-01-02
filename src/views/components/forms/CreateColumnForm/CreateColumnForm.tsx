import { useFormik } from "formik";
import React, { FC } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import st from "./CreateColumnForm.module.scss";
import * as Yup from "yup";
import { useCreateColumnMutation } from "../../../../redux/services/columns/columnsApi";
import { IColumn } from "../../../../types/entities.types";
import { translate } from "../../../../locales/translate";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { VALIDATE_MESSAGES } from "../../../../helpers/validateHelpers";
import { notifyError } from "../../../../helpers/toastHelpers";

interface IProps extends WrappedComponentProps {
  onClose: () => void;
  projectId: string;
  onSubmit: (col: IColumn) => void;
}

const CreateColumnForm: FC<IProps> = ({ onClose, projectId, onSubmit, intl }) => {
  const [createCol, { isLoading }] = useCreateColumnMutation();

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
        const col = await createCol({ ...values, projectId }).unwrap();
        onSubmit(col);
        onClose();
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
          placeholder={intl.formatMessage({ id: "createColumn.label.name" })}
          label={intl.formatMessage({ id: "createColumn.label.name" })}
          onChange={formik.handleChange}
          name="name"
          errorMsg={formik.errors.name}
        />
      </div>
      <Button type="submit" disabled={isLoading || formik.isSubmitting}>
        {translate({ id: "projects.create" })}
      </Button>
    </form>
  );
};

export default injectIntl(CreateColumnForm);
