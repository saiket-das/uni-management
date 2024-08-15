import { Form } from "antd";
import { ReactNode } from "react";
import {
  FormProvider,
  SubmitHandler,
  FieldValues,
  useForm,
} from "react-hook-form";

type FormConfigProps = {
  // defaultValues?: Record<string, string | number>;
  // resolver?: any;
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type AppFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & FormConfigProps;

const AppForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: AppFormProps) => {
  const formConfig: FormConfigProps = {};

  if (defaultValues) formConfig["defaultValues"] = defaultValues;
  if (resolver) formConfig["resolver"] = resolver;

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default AppForm;
