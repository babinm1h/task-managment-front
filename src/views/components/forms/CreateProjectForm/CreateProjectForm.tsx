import { useFormik } from "formik";
import React, { FC } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import st from "./CreateProjectForm.module.scss";
import * as Yup from "yup";
import { useCreateProjectMutation } from "../../../../redux/services/projects/projectsApi";
import { VALIDATE_MESSAGES } from "../../../../helpers/validateHelpers";
import { translate } from "../../../../locales/translate";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { notifyError } from "../../../../helpers/toastHelpers";

interface IProps extends WrappedComponentProps {
  onClose: () => void;
}

const CreateProjectForm: FC<IProps> = ({ onClose, intl }) => {
  const [createProj, { isLoading }] = useCreateProjectMutation();

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
        await createProj(values);
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
          placeholder={intl.formatMessage({ id: "createProject.label.name" })}
          label={intl.formatMessage({ id: "createProject.label.name" })}
          onChange={formik.handleChange}
          name="name"
          errorMsg={formik.errors.name}
        />
      </div>
      <Button type="submit" disabled={isLoading || formik.isSubmitting}>
        {translate({ id: "common.create" })}
      </Button>
    </form>
  );
};

export default injectIntl(CreateProjectForm);
