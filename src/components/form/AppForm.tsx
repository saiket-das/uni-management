import { ReactNode } from "react";
import {
  FormProvider,
  SubmitHandler,
  FieldValues,
  useForm,
} from "react-hook-form";

type FormConfigProps = {
  defaultValues?: Record<string, string | number>;
};
type AppFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & FormConfigProps;

const AppForm = ({ onSubmit, children, defaultValues }: AppFormProps) => {
  const formConfig: FormConfigProps = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default AppForm;
