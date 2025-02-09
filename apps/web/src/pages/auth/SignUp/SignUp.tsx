import { FC } from "react";
import Form from "./children/Form";
import AuthPageLayout from "@/layouts/AuthPageLayout";

const SignUp: FC = () => {
  return (
    <AuthPageLayout>
      <Form />
    </AuthPageLayout>
  );
};

export default SignUp;
